import { useState, useEffect } from "react";

import Button from "./Button";
import Help from "./Help";
import Info from "./Info";

import titleLogo from "../icons/logo.svg";
import help from "../icons/help.svg";
import info from "../icons/info.svg";

const Start = ({ handleGameStart }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          setIsHelpOpen(false);
        }
      },
      false
    );
  }, []);

  return (
    <>
      {/* Overlay */}
      {isHelpOpen && (
        <Help
          onClose={() => {
            setIsHelpOpen(false);
          }}
        />
      )}
      {isInfoOpen && (
        <Info
          onClose={() => {
            setIsInfoOpen(false);
          }}
        />
      )}
      <div className="flex flex-col items-center py-12">
        <p className="mt-28 text-[1.62rem]">しりとりで知る鉄道駅</p>
        <img className="w-64 mb-8" src={titleLogo} alt="しりてつ" />
        <Button value="スタート" keybind="Space" onClick={handleGameStart} />
        <div className="mt-12 w-64 flex flex-row justify-center space-x-4">
          <button
            onClick={() => {
              setIsHelpOpen(true);
            }}
          >
            <img className="w-8" src={help} alt="help" />
          </button>
          <button
            onClick={() => {
              setIsInfoOpen(true);
            }}
          >
            <img className="w-8" src={info} alt="info" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Start;
