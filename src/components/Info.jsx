import Overlay from "./Overlay";

const Info = ({ onClose }) => {
  return (
    <Overlay title="About this game" onClose={onClose}>
      <h2 className="text-lg font-bold">このゲームについて</h2>
      <ul>
        <li>Contact</li>
        <li>Privacy policy</li>
        <li>Buy me a coffee</li>
        <li>Credit</li>
      </ul>
    </Overlay>
  );
};

export default Info;
