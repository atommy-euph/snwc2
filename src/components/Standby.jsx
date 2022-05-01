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
      <h2 className="mt-10 text-4xl font-bold">{count}</h2>
    </div>
  );
};

export default Standby;
