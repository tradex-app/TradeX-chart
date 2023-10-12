import { FC } from "react";
import { ChartResolutionEnum } from "../utils/enums";

interface IProps {
  interval: ChartResolutionEnum;
  onChangeInterval: (value) => void;
  styles?: string;
  intervals?: string[];
}

const IntervalsFilter: FC<IProps> = ({
  interval,
  onChangeInterval,
  styles = "",
  intervals,
}) => {
  return (
    <div
      className={`rounded px-2 py-2 bg-foreground dark:bg-state-inactive flex flex-row flex-wrap text-text-secondary text-xs font-normal ${styles}`}
    >
      {intervals.map((item) => (
        <button
          key={item}
          className={`px-2 py-1 mx-1${
            interval && item === interval
              ? " rounded text-white bg-iris-base"
              : ""
          } `}
          onClick={() => onChangeInterval(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default IntervalsFilter;
