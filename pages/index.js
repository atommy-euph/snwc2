import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import titleLogo from "../public/icons/logo.svg";
import info from "../public/icons/info.svg";
import records from "../public/icons/records.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-12">
      <Head>
        <title>尻鉄 | しりとりで知る鉄道駅</title>
      </Head>
      <div className="absolute top-5 right-5 flex items-center space-x-3">
        <Link href="/signin">
          <button>ログイン</button>
        </Link>
      </div>
      <p className="mt-8 text-[1.62rem]">しりとりで知る鉄道駅</p>
      <Image width={256} height={256} src={titleLogo} alt="しりてつ" />
      <div className="h-12"></div>

      <h3>モード選択</h3>
      <div className="flex flex-col justify-between items-center space-y-4">
        <Link href="/endless/">
          <a className="link-button">エンドレス</a>
        </Link>
        <Link href="/speed/">
          <a className="link-button">スピード</a>
        </Link>
      </div>
      <div className="mt-12 w-64 flex flex-row justify-center space-x-4">
        <Link href="info">
          <a>
            <Image width={30} height={30} src={info} alt="info" />
          </a>
        </Link>
        <Link href="records">
          <a>
            <Image width={30} height={30} src={records} alt="records" />
          </a>
        </Link>
      </div>
    </div>
  );
}
