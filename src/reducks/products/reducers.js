import * as Actions from "./actions";
// なぜimportできない
import { initialState } from "../store/initialState";

// 第二引数の意味
// ProductsReducersはどこで実行されるのか
export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        // ...action.payloadだけだと更新ができない
        list: [...action.payload],
      };
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        // ...action.payloadだけだと更新ができない
        list: [...action.payload],
      };
    default:
      return state;
  }
};
