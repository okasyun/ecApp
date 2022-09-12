import { createSelector } from "reselect";

// stateを引数にしてstate.usersを戻す
const usersSelector = (state) => state.users;

export const getIsSigndIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.orders
);

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);
export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
);
