// import React, { useCallback, useState } from "react";
// import { PrimaryButton, TextInput } from "../components/UIkit";
// import { signIn } from "../reducks/users/operations";
// import { useDispatch } from "react-redux";
// import { push } from "connected-react-router";

import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { signIn } from "../reducks/users/operations";
import { push } from "connected-react-router";

const SignIn = () => {
  const dispatch = useDispatch();
  // ユーザー名などのstate（ユーザーのアクションで変更する変数）を設定
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  // return以降は一つのタグで囲まれている必要がある

  // onChangeで入力したらusernameに入力値を代入する（メモ化）
  // 第二引数の意味
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiLine={false}
        required={true}
        minRows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiLine={false}
        required={true}
        minRows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"Sign in"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signup"))}>
          アカウントをお持ちでない方はこちら
        </p>
        <p onClick={() => dispatch(push("/signin/reset"))}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignIn;
