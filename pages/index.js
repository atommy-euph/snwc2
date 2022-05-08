import Image from "next/image";

import titleLogo from "../public/icons/logo.svg";
import info from "../public/icons/info.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center py-12">
        <p className="mt-8 text-[1.62rem]">しりとりで知る鉄道駅</p>
        <Image width={256} height={256} src={titleLogo} alt="しりてつ" />
        <div className="h-12"></div>

        <h3>モード選択</h3>
        <div className="flex flex-col justify-between items-center space-y-4">
          <Link href="/endless/">
            <a className="link-button">エンドレス</a>
          </Link>
          {/* inactive */}
          <Link href="">
            <a className="link-button opacity-50">
              スピード
              <br />
              (Coming Soon)
            </a>
          </Link>
        </div>
        <div className="mt-12 w-64 flex flex-row justify-center space-x-4">
          <Link href="info">
            <a>
              <Image width={30} height={30} src={info} alt="info" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
