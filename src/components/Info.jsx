import Overlay from "./Overlay";
import logo from "../icons/logo_type.svg";
import bmcButton from "../icons/bmc-button.png";
import atommy from "../icons/atommy.svg";

const Info = ({ onClose }) => {
  return (
    <Overlay title="About this game" onClose={onClose}>
      <h1 className="flex flex-row font-bold items-center">
        <img className="w-14 inline mr-1" src={logo} alt="尻鉄" />
        <span className="inline-block pt-3">について</span>
      </h1>
      <h2>作者</h2>
      <div className="flex flex-row items-center mb-4">
        <img className="w-44 inline mr-2" src={atommy} alt="Atommy" />
      </div>
      <ul>
        <li>
          Website: <a href="https://atommy.me">atommy.me</a>
        </li>
        <li>
          Mail: <a href="mailto:info@atommy.me">info@atommy.me</a>
        </li>
      </ul>

      <h2>プライバシーポリシー</h2>
      <h2>クレジット</h2>
      <h2>製作者への寄付</h2>
      <a href="https://buymeacoffee.com/atommy">
        <img className="w-44" src={bmcButton} alt="Buy me a coffee" />
      </a>
    </Overlay>
  );
};

export default Info;
