import { FC } from "react";
import Dropdown from "./Dropdown";

interface IDropdownWithCheckProps {
  onChange: (item: any) => void;
  active?: { value: any }[];
  items: {
    name: string;
    value: any;
  }[];
  icon: any;
  label?: string;
  selectedItem?: string;
  displaySelected?: boolean;
  checkBoxes?: boolean;
}

const DropdownWithCheck: FC<IDropdownWithCheckProps> = ({
  onChange,
  active = [],
  items,
  icon,
  label,
  selectedItem,
  displaySelected,
  checkBoxes = false,
}) => {
  return (
    <Dropdown
      label={label}
      icon={icon}
      selectedItem={selectedItem}
      displaySelected={displaySelected}
    >
      <ul className="transition-all ease-in-out absolute z-[2] mt-2 duration-300 max-h-[20rem] overflow-y-scroll h-auto">
        {items?.map((item, key) => (
          <li key={key}>
            <button
              className="flex gap-3 outline-none justify-between relative hover:cursor-pointer hover:bg-iris-light hover:dark:bg-highlight-dark bg-foreground dark:bg-bg-dark-secondary text-left text-text-primary dark:text-text-dark-primary px-3 py-2.5 text-sm leading-[1.125rem] w-[11.25rem]"
              onClick={() => {
                onChange(item);
              }}
            >
              <span className="block truncate text-xs md:text-sm">
                {item.name}
              </span>

              {checkBoxes &&
                (active.find((element) => element.value === item.value) ? (
                  <span className="flex rounded-full h-4 w-4 items-center justify-center bg-button-primary">
                    X
                  </span>
                ) : (
                  <span className="block rounded-full h-4 w-4 border-1 border-solid border-separator-blue" />
                ))}
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default DropdownWithCheck;
