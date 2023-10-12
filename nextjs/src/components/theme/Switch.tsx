import React, { useEffect, useState } from "react";

export interface IOption {
  id: number;
  label: string;
  value: number | string;
  info?: string;
  icon?: any;
}

interface IProps {
  value: IOption;
  items: IOption[];
  fontSize?: string;
  variant?: "primary" | "default";
  onChange: (value: IOption) => void;
}

const Switch: React.FC<IProps> = ({
  onChange,
  items,
  value,
  variant = "default",
  fontSize = "text-base",
}) => {
  const [activeVariant, setActiveVariant] = useState<string>();

  useEffect(() => {
    switch (variant) {
      case "primary":
        setActiveVariant("bg-iris-base text-white");
        break;
      default:
        setActiveVariant("bg-iris-light dark:bg-bg-dark-light");
    }
  }, [variant]);

  return (
    <div className="rounded-lg flex bg-foreground dark:bg-state-inactive p-1.5 items-center w-fit">
      {items.map((item) => (
        <button
          key={item.id}
          className={`${fontSize} py-2 px-5 flex gap-3 cursor-pointer items-center rounded-md ${
            value.value === item.value && activeVariant
          }`}
          onClick={() => onChange(item)}
        >
          {item.icon}
          {item.label}
          {item.info && (
            <span className="text-xs py-1 px-2 bg-iris-semi-light dark:bg-iris-light/40 rounded">
              {item.info}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Switch;
