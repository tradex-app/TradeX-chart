import DropdownWithCheck from "../../dropdown/DropdownWithCheck";
import { SelectedIndicators } from "../indicators/availbleIndicators";

const IndicatorDropdown = ({ onChange, indicators, icon }) => {
  const dropdownIndicators = Object.keys(SelectedIndicators(indicators)).map(
    (key) => {
      const indicator = SelectedIndicators(indicators)[key];
      return {
        name: indicator.name,
        value: indicator.id,
        customSettings: indicator.customSettings,
      };
    }
  );

  return (
    <DropdownWithCheck
      items={dropdownIndicators}
      onChange={onChange}
      icon={icon}
      label={"Indicators"}
      checkBoxes={false}
    />
  );
};

export default IndicatorDropdown;
