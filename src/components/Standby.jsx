import { useEffect, useState } from "react";
import { COUNTDOWN_TIME } from "../constant/config";

const Standby = () => {
  const [count, setCount] = useState(COUNTDOWN_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) setCount((c) => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
      <p className="mt-64 text-6xl">{count}</p>
    </div>
  );
};

export default Standby;
