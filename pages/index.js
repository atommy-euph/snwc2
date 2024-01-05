import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/Header.jsx";

import titleLogo from "../public/icons/logo.svg";
import info from "../public/icons/info.svg";
import records from "../public/icons/records.svg";

import FirstVisitModal from "../components/FirstVisitModal.jsx";

export default function Home() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // ブラウザ環境でのみ実行
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("firstVisit") === "true") return;
      else {
        setIsFirstVisit(true);
        localStorage.setItem("firstVisit", "true");
        return;
      }
    }
  }, []);

  return (
    <>
      {isFirstVisit && (
        <FirstVisitModal onClose={() => setIsFirstVisit(false)} />
      )}
      <div className="flex flex-col items-center  pb-12">
        <Head>
          <title>尻鉄 | しりとりで知る鉄道駅</title>
        </Head>
        <Header />
        <p className="mt-8 text-[1.62rem]">しりとりで知る鉄道駅</p>
        <Image
          loading="lazy"
          width={256}
          height={256}
          src={titleLogo}
          alt="しりてつ"
        />
        <div className="h-8"></div>

        <h3>モード選択</h3>
        <div className="flex flex-col justify-between items-center space-y-4">
          <Link href="/endless/">
            <a className="link-button">エンドレス</a>
          </Link>
          <Link href="/speed/">
            <a className="link-button">スピード</a>
          </Link>
        </div>
        <div className="mt-12 flex flex-col justify-start space-y-2">
          <Link href="info">
            <span className="flex items-center space-x-4 underline">
              <Image width={30} height={30} src={info} alt="info" />
              <span>ゲームについて</span>
            </span>
          </Link>
          <Link href="records">
            <span className="flex items-center space-x-4 underline">
              <Image width={30} height={30} src={records} alt="records" />
              <span>ランキング</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
