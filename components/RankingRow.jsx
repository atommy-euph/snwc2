const RankingRow = ({
  rank,
  name,
  count,
  timeOrLetter,
  date,
  start,
  end,
  isHeading,
}) => {
  const cssProp = `shrink-0 whitespace-nowrap text-right ${
    isHeading ? "font-bold" : ""
  }`;
  return (
    <div className="flex items-center mb-3 text-sm">
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
        {timeOrLetter} {!isHeading && "秒"}
      </span>
      <span className={`w-24 ${cssProp}`}>{date}</span>
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
