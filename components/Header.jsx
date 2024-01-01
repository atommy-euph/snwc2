import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex justify-end items-center w-full h-16 px-2">
      {currentUser ? (
        <div className="flex justify-end items-center space-x-2">
          <span>{currentUser.email}</span>
          <button
            className="border-2 border-black px-2 py-1 font-bold"
            onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .then(() => {
                  alert("ログアウトしました");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div className="flex justify-end items-center space-x-2">
          <span>ゲスト</span>
          <div className="border-2 border-black px-2 py-1 font-bold">
            <Link className="font-black" href="/signin">
              <a className="no-underline text-black">ログイン</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
