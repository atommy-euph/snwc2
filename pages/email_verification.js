import Page from "../components/Page";

export default function SignIn() {
  return (
    <Page title="メール認証" backButton={false}>
      <h1>アカウント認証メールを送信しました</h1>
      <div className="flex flex-col space-y-4">
        <p></p>
        <p>
          ご登録のメールアドレスに確認メールを送信しました。リンクをクリックしてから、ログインしてください。
        </p>
        <p>
          確認メールが届かない場合は、迷惑メールフォルダをご確認ください。それでも、確認メールが見当たらない場合は、別のアドレスをお試しください。
        </p>
      </div>
    </Page>
  );
}
