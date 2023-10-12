/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef } from "react";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";
import Button from "../../Button";
import { TickSvg } from "../../theme/svg";
import { DropdownFilledArrow } from "../../theme/CommonSvg";

const IndicatorDropdown = ({ onChange, value, indicators }) => {
  const dropdownRef = useRef(null);
  const [isOpened, setIsOpened] = useDetectOutsideClick(dropdownRef, false);

  const transformedIndicators = Object.keys(indicators).map((key) => ({
    name: indicators[key].name,
    value: indicators[key].id,
    // selectLabel: indicators[key].customSettings?.selectLabel,
    customSettings: indicators[key].customSettings,
  }));

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        size="small"
        variant="inactive"
        onClick={() => {
          setIsOpened(!isOpened);
        } } children={undefined}      >
        Indicators
        <span
          className={`${
            isOpened && "rotate-180"
          } transition ease-in-out duration-300`}
        >
          <DropdownFilledArrow />
        </span>
      </Button>
      {isOpened && (
        <ul
          className={`transition-all ease-in-out absolute z-[2] right-0 duration-300 ${
            isOpened ? "max-h-[12.8rem]" : "max-h-0"
          } overflow-y-scroll h-auto`}
        >
          {transformedIndicators?.map((item, key) => (
            <li
              className={`
              relative hover:cursor-pointer hover:bg-iris-light hover:dark:bg-highlight-dark 
            bg-foreground dark:bg-bg-dark-secondary text-left text-text-primary dark:text-text-dark-primary px-3 py-2.5 rounded text-sm leading-[1.125rem] w-[11.25rem]`}
              onClick={() => {
                onChange(item);
              }}
              key={key}
            >
              <button className="flex gap-3 outline-none w-full justify-between">
                <span className="block truncate text-xs md:text-sm">
                  {/* {item.selectLabel || item.name}  */}
                  {item.name}
                </span>

                {value.find((element) => element.value === item.value) ? (
                  <span className="flex rounded-full h-4 w-4 items-center justify-center bg-button-primary">
                    <TickSvg />
                  </span>
                ) : (
                  <span className="block rounded-full h-4 w-4 border-1 border-solid border-separator-blue" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IndicatorDropdown;
