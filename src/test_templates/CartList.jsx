// import React, { useCallback } from "react";
// import List from "@material-ui/core/List";
// import { useDispatch, useSelector } from "react-redux";
// import { getProductsInCart } from "../reducks/users/selectors";
// import CartListItem from "../components/Products/CartListItem";
// import { GreyButton, PrimaryButton } from "../components/UIkit";
// import { push } from "connected-react-router";
// import { makeStyles } from "@material-ui/core";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { CartListItem } from "../components/Products";
import { PrimaryButton, GreyButton } from "../components/UIkit";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});
const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium"></div>
      <div className="p-grid__column">
        <PrimaryButton label={"レジに進む"} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small"></div>
        <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
