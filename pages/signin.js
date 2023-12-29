import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Page from "../components/Page";

// initialize firebase
import { app } from "../lib/firebase";

export default function SineUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

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
        alert("登録が完了しました");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Page title="">
      <h1>ログイン</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={() => register()}>ログイン</button>
      </div>
      <p className="mt-10">
        アカウントをお持ちでない方は<Link href="signup">こちら</Link>
        から新規登録画面へ
      </p>
    </Page>
  );
}
