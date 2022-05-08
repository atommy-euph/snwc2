import Image from "next/image";
import { useRouter } from "next/router";

import back from "../public/icons/back.svg";

const Page = ({ children, title }) => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-[36rem] py-6 px-4">
      <div className="flex flex-row justify-start space-x-2 items-center">
        <button className="w-7 h-[1.5rem]" onClick={() => router.back()}>
          <Image src={back} width={28} height={28} alt="back" />
        </button>
        <h1 className="m-0">{title}</h1>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Page;
