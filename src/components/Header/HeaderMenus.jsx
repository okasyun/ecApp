// import React, { useEffect } from "react";
// import IconButton from "@material-ui/core/IconButton";
// import { Badge } from "@material-ui/core";
// import { fetchProductsInCart } from "../../reducks/users/operations";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import MenuIcon from "@material-ui/icons/Menu";
// import { getProductsInCart, getUserId } from "../../reducks/users/selector";
// import { useSelector } from "react-redux";
// import { db } from "../../firebase/index";
// import { useDispatch } from "react-redux";
// import { push } from "connected-react-router";

import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import { fetchProductsInCart } from "../../reducks/users/operations";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart, getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "../../firebase/index";
import MenuIcon from "@material-ui/icons/Menu";

const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  let productsInCart = getProductsInCart(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break;
            case "modified":
              const index = productsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
              break;
            case "removed":
              // eslint-disable-next-line react-hooks/exhaustive-deps
              productsInCart = productsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(productsInCart));
      });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <IconButton onClick={() => dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;