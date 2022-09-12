// import React, { useCallback, useState } from "react";
// import { PrimaryButton, TextInput } from "../components/UIkit";
// import { signUp } from "../reducks/users/operations";
// import { useDispatch } from "react-redux";
// import { push } from "connected-react-router";

import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { signUp } from "../reducks/users/operations";
import { push } from "connected-react-router";

const SignUp = () => {
  const dispatch = useDispatch();
  // ユーザー名などのstate（ユーザーのアクションで変更する変数）を設定
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");
  // return以降は一つのタグで囲まれている必要がある

  // onChangeで入力したらusernameに入力値を代入する（メモ化）
  // 第二引数の意味
  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

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

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );
  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"ユーザー名"}
        multiLine={false}
        required={true}
        minRows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
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
      <TextInput
        fullWidth={true}
        label={"パスワード（再確認）"}
        multiLine={false}
        required={true}
        minRows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signin"))}>
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
