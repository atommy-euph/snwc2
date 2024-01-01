import Page from "../components/Page";

export default function SignIn() {
  return (
    <Page title="" backButton={false}>
      <h1>アカウント認証メールを送信しました</h1>
      <div className="flex flex-col space-y-4">
        <p></p>
        <p>
          ご登録のメールアドレスに確認メールを送信しました。リンクをクリックしからログインを完了してください。
        </p>
      </div>
    </Page>
  );
}
