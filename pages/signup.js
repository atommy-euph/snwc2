import { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Page from "../components/Page";
import SubmitButton from "../components/SubmitButton";

import Input from "../components/Input";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const actionCodeSettings = {
    url: "http://localhost:3000/signin",
    handleCodeInApp: false,
  };
  const register = () => {
    if (!email) return alert("メールアドレスを入力してください");
    if (!password) return alert("パスワードを入力してください");
    if (password.length < 6)
      return alert("パスワードは6文字以上で入力してください");

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        sendEmailVerification(user, actionCodeSettings)
          .then(() => {
            router.push("/email_verification");
          })
          .catch((error) => {
            alert(
              "メールアドレスに確認メールを送信できませんでした。サイトの管理者にお問い合わせください。"
            );
            console.log(error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          // すでに登録されているメールアドレス
          alert("すでに登録されているメールアドレスです");
        } else if (error.code === "auth/invalid-email") {
          // メールアドレスの形式がおかしい
          alert("メールアドレスの形式が正しくありません");
        } else if (error.code === "auth/operation-not-allowed") {
          // 有効化されていない
          alert(
            "email/password アカウントが有効になっていません。サイトの管理者にお問い合わせください。"
          );
        } else if (error.code === "auth/weak-password") {
          // パスワードが弱い
          alert("パスワードが簡単すぎます");
        } else {
          // その他
          console.log(error);
        }
      });
  };
  return (
    <Page title="">
      <h1>サインアップ</h1>
      <div className="flex flex-col space-y-4">
        <Input
          type="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <Input
          type="password"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton onClick={() => register()}>確認メールを送信</SubmitButton>
      </div>
    </Page>
  );
}
