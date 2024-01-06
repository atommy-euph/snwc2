import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Page from "../components/Page";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";

export default function SineUp() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const resetEmail = () => {
    if (!email) return alert("メールアドレスを入力してください");

    const auth = getAuth();
    const actionCodeSettings = {
      url: "https://shiritetsu.railword.com//signin",
      handleCodeInApp: false,
    };

    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        // パスワード再設定のメールが送信されたことをわかりやすくするためのアラート
        alert(
          "パスワード再設定のメールを送信しました。メールのリンクから再設定を行ってください。"
        );
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          // メールアドレスの形式がおかしい
          alert("メールアドレスの形式が正しくありません");
        } else if (error.code === "auth/user-not-found") {
          // ユーザが存在しない
          alert("アカウントが存在しません");
        } else {
          // その他
          console.log(error);
        }
      });
  };
  return (
    <Page title="">
      <h1>パスワードの再設定</h1>
      <div className="flex flex-col space-y-4">
        <Input
          type="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <SubmitButton onClick={() => resetEmail()}>送信</SubmitButton>
      </div>
    </Page>
  );
}
