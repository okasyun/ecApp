import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSigndIn } from "./reducks/users/selectors";
import { listenAuthState } from "./reducks/users/operations";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSigndIn = getIsSigndIn(selector);

  useEffect(() => {
    if (!isSigndIn) {
      dispatch(listenAuthState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSigndIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
