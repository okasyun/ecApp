import { createSelector } from "reselect";

// productsだけ抜き取る
const productsSelector = (state) => state.products;

export const getProducts = createSelector(
    [productsSelector],
    // state=proctsSelector？
    // listだけ抜き出して返す
    state => state.list
)