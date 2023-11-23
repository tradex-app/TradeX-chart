import React, { FC, ReactNode, useRef } from "react";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";

interface IDropdownProps {
  label: string;
  children: ReactNode;
  icon?: any;
  selectedItem?: string;
  displaySelected?: boolean;
}

const Dropdown: FC<IDropdownProps> = ({
  label,
  children,
  icon: Icon,
  selectedItem,
  displaySelected,
}) => {
  const dropdownRef = useRef(null);
  const [isOpened, setIsOpened] = useDetectOutsideClick(dropdownRef, false);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        <span className="py-1">
          {Icon && <Icon height={17} fill="currentColor" />}
        </span>
        {displaySelected && selectedItem ? (
          <span className="mx-2 text-xs px-4 py-1.5 cursor-pointer rounded-md text-white bg-iris-base">
            {selectedItem}
          </span>
        ) : (
          label
        )}
        <span
          className={`${
            isOpened ? "rotate-180" : ""
          } transition ease-in-out duration-300`}
        >
          <span className="py-1">{">"}</span>
        </span>
      </button>
      {isOpened && children}
    </div>
  );
};

export default Dropdown;
