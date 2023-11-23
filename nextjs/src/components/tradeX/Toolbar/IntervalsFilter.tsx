import { FC } from "react";
import DropdownWithCheck from "../../dropdown/DropdownWithCheck";
import { ChartResolutionEnum } from "../utils/enums";

interface IProps {
  active: ChartResolutionEnum;
  onChangeInterval: (value: ChartResolutionEnum) => void;
  intervals?: ChartResolutionEnum[];
  icon?: any;
}

const IntervalsFilter: FC<IProps> = ({
  active,
  onChangeInterval,
  intervals,
  icon,
}) => {
  const items = intervals?.map((intv) => ({
    name: intv,
    value: intv,
  }));

  return (
    <DropdownWithCheck
      items={items || []}
      onChange={(selectedInterval) => onChangeInterval(selectedInterval.value)}
      icon={icon}
      displaySelected
      active={items?.filter((item) => item.value === active)}
      selectedItem={active}
      checkBoxes
    />
  );
};

export default IntervalsFilter;
