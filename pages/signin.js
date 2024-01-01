import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Page from "../components/Page";
import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = () => {
    if (!email) return alert("メールアドレスを入力してください");
    if (!password) return alert("パスワードを入力してください");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!user.emailVerified) {
          alert(
            "メールアドレスが認証されていません。メールのリンクから認証を行ってください。"
          );
          return;
        }

        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          // メールアドレスの形式がおかしい
          alert("メールアドレスの形式が正しくありません");
        } else if (error.code === "auth/user-disabled") {
          // ユーザが無効になっている
          alert("アカウントが無効です");
        } else if (error.code === "auth/user-not-found") {
          // ユーザが存在しない
          alert("アカウントが存在しません");
        } else if (error.code === "auth/wrong-password") {
          // パスワードが間違っている
          alert("パスワードが間違っています");
        } else if (error.code === "auth/too-many-requests") {
          // 何度もパスワードを間違えた
          alert(
            "何度も間違えたため、アカウントがロックされました。しばらくしてから再度お試しください"
          );
        } else {
          // その他
          alert(error.message);
        }
      });
  };
  return (
    <Page title="">
      <h1>ログイン</h1>
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
        <SubmitButton onClick={() => login()}>ログイン</SubmitButton>
      </div>
      <p className="mt-10">
        アカウントをお持ちでない方は
        <Link href="signup">こちらから新規登録画面へ</Link>
      </p>
      <p className="">
        <Link href="forget_password">パスワードを忘れた場合</Link>
      </p>
    </Page>
  );
}
