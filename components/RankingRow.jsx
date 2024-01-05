const RankingRow = ({
  rank,
  name,
  count,
  timeOrLetter,
  date,
  start,
  end,
  isHeading,
  mode,
}) => {
  const cssProp = `shrink-0 whitespace-nowrap text-right ${
    isHeading ? "font-bold" : ""
  }`;
  const second = mode === "endless" ? "秒" : "文字";
  return (
    <div className="flex items-center mb-3 text-sm space-x-2">
      <span
        className={`shrink-0 font-bold text-md mr-5 border-2 ${
          rank ? "border-black" : "border-transparent"
        } w-6 h-6 text-center`}
      >
        {rank}
      </span>
      <span className={`w-24 overflow-x-scroll hidden-scrollbar ${cssProp}`}>
        {name}
      </span>
      <span className={`w-16 ${cssProp}`}>
        {count} {!isHeading && "駅"}
      </span>
      <span className={`w-16 ${cssProp}`}>
        {timeOrLetter} {!isHeading && second}
      </span>
      <span className={`w-20 ${cssProp}`}>{date}</span>
      <span className={`w-32 overflow-x-scroll hidden-scrollbar ${cssProp}`}>
        {start}
      </span>
      <span className={`w-32 overflow-x-scroll hidden-scrollbar ${cssProp}`}>
        {end}
      </span>
    </div>
  );
};

export default RankingRow;
