import * as Actions from "./actions";
import { initialState } from "../store/initialState";

// 第二引数の意味
export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.FETCH_ORDERS_HISTORY:
      return {
        /// スプレッド構文
        // 配列が結合されて出力される
        // stateをなくすと上書きされるため、初期のstateと更新されたaction.payloadをマージする
        ...state,
        orders: [...action.payload],
      };

    case Actions.FETCH_PRODUCTS_IN_CART:
      return {
        /// スプレッド構文
        // 配列が結合されて出力される
        // stateをなくすと上書きされるため、初期のstateと更新されたaction.payloadをマージする
        ...state,
        cart: [...action.payload],
      };

    case Actions.SIGN_IN:
      return {
        /// スプレッド構文
        // 配列が結合されて出力される
        // stateをなくすと上書きされるため、初期のstateと更新されたaction.payloadをマージする
        ...state,
        ...action.payload,
      };
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
