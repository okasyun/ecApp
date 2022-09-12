// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { ProductCard } from "../components/Products";
// import { fetchProducts } from "../reducks/products/operations";
// import { getProducts } from "../reducks/products/selectors";

import React, { useEffect } from "react";
import { ProductCard } from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../reducks/products/selectors";
import { fetchProducts } from "../reducks/products/operations";

const ProductList = () => {
  // dispatch=actionをreducer→ストアに届ける？
  const dispatch = useDispatch();
  // selectorにはstoreの全てのstateが格納
  // combineReducersの値？
  const selector = useSelector((state) => state);
  // 商品情報を取得
  const products = getProducts(selector);
  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";
  useEffect(() => {
    dispatch(fetchProducts(gender, category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              price={product.price}
              name={product.name}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
