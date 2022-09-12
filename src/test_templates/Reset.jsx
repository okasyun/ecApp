// import React, { useCallback, useState } from "react";
// import { PrimaryButton, TextInput } from "../components/UIkit";
// import { resetPassword } from "../reducks/users/operations";
// import { useDispatch } from "react-redux";
// import { push } from "connected-react-router";

import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();
  // ユーザー名などのstate（ユーザーのアクションで変更する変数）を設定
  const [email, setEmail] = useState("");
  // return以降は一つのタグで囲まれている必要がある

  // onChangeで入力したらusernameに入力値を代入する（メモ化）
  // 第二引数の意味
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
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
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"Reset Password"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signin"))}>ログイン画面に戻る</p>
      </div>
    </div>
  );
};

export default Reset;
