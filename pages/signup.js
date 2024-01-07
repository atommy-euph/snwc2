import { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import Link from "next/link";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

import Page from "../components/Page";
import SubmitButton from "../components/SubmitButton";

import Input from "../components/Input";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const actionCodeSettings = {
    url: "https://shiritetsu.railword.com//signin",
    handleCodeInApp: false,
  };
  const register = async () => {
    if (!email) return alert("メールアドレスを入力してください");
    if (!password) return alert("パスワードを入力してください");
    if (password.length < 6)
      return alert("パスワードは6文字以上で入力してください");

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      // ユーザー情報をfirestoreに保存
      const docRef = doc(db, "users", user.uid);

      await setDoc(docRef, {
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: new Date(),
      });

      sendEmailVerification(user, actionCodeSettings);
      router.push("/email_verification");
    } catch (error) {
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
    }
  };
  return (
    <Page title="サインアップ">
      <h1>サインアップ</h1>
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="ニックネーム"
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <Input
          type="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton onClick={() => register()}>確認メールを送信</SubmitButton>
      </div>
      <p className="mt-10">
        ※ メールアドレスは Gmail(@gmail.com)を推奨いたします。
      </p>
      <p>
        ※
        確認メールが届かない場合は、迷惑メールフォルダをご確認ください。それでも、確認メールが見当たらない場合は、別のアドレスをお試しください。
      </p>
      <p>
        ※
        ご入力いただいた個人情報は、本サイトの機能を提供するためにのみ利用し、第三者に提供されることはありません。詳しくは
        <Link href="/info#privacy-policy">プライバシーポリシー</Link>
        をご覧ください。
      </p>
    </Page>
  );
}
