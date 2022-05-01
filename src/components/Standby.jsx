import { useEffect, useState } from "react";
import { COUNTDOWN_TIME } from "../constant/config";

const Standby = ({ answers }) => {
  const [count, setCount] = useState(COUNTDOWN_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) setCount((c) => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
      <p className="text-center mt-64 text-6xl">{count}</p>
      <p className="text-center mt-12 mb-0 text-md">出発駅</p>
      <p className="font-bold text-3xl">{answers[0].answer}</p>
    </div>
  );
};

export default Standby;
