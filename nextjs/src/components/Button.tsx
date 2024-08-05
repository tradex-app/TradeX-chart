import { useEffect, useState } from "react";

const DEFAULT_STYLE = [
  "text-white",
  "bg-button-primary",
  "hover:bg-highlight-button-primary",
  "border-1",
  "border-solid",
  "border-button-primary",
];

export type ButtonVariant =
  | "primary"
  | "green"
  | "neutral"
  | "neutral-text-iris"
  | "outline"
  | "red"
  | "white"
  | "gray"
  | "inactive";

interface IProps {
  children: React.ReactNode | string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  size?: "default" | "small" | "large" | "xl" | "full";
  styles?: string;
  isDisabled?: boolean;
  underline?: boolean;
  fontSize?: string;
  onClick?: (e) => void;
  dataAttr?: string;
}

const Button = ({
  onClick = null,
  children,
  variant = "primary",
  size = "default",
  styles = "",
  isDisabled = false,
  type = "button",
  underline = false,
  fontSize = "text-sm",
  dataAttr = null,
}: IProps) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    let classes = [];

    switch (variant) {
      case "green": {
        classes = ["bg-green", "text-white"];
        break;
      }
      case "red": {
        classes = ["bg-red", "text-white"];
        break;
      }
      case "neutral":
        classes = [
          "bg-transparent",
          "text-text-primary",
          "dark:text-text-dark-primary",
        ];
        break;
      case "neutral-text-iris":
        classes = ["bg-transparent", "text-button-primary", "font-semibold"];
        break;
      case "outline":
        classes = [
          "bg-transparent",
          "font-semibold",
          "border-1",
          "border-solid",
          "border-button-primary",
          "text-text-primary",
          "dark:text-text-dark-primary",
        ];
        break;

      case "white": {
        classes = [
          "bg-brand-white",
          "text-text-tertiary",
          "hover:text-text-dark-active",
        ];
        break;
      }
      case "gray":
        classes = [
          "bg-highlight",
          "dark:bg-highlight-dark",
          "text-text-primary",
          "dark:text-text-dark-primary",
        ];
        break;
      case "inactive":
        classes = [
          "bg-foreground",
          "dark:bg-state-inactive",
          "text-text-primary",
          "dark:text-text-dark-primary",
        ];
        break;
      default:
        classes = [...DEFAULT_STYLE];
    }

    if (underline) classes.push("underline");

    if (size === "large") {
      classes.push("px-[3.375rem]");
      classes.push("py-3.5");
      // classes.push(`text-big`);
    }

    if (size === "xl") {
      classes.push("px-[4.8rem]");
      classes.push("py-3.5");
    }

    if (size === "full") {
      // classes.push(`text-big`);
      classes.push("w-full");
      classes.push("py-3.5");
    }

    if (size === "small") {
      classes.push("py-3");
      classes.push("px-3");
    }

    if (size === "default" && !variant.includes("neutral")) {
      classes.push("py-3.5");
      classes.push("px-10");
    }

    setClassName(classes.join(" "));
  }, [variant, size]);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${fontSize} font-semibold
      rounded 
      h-fit w-fit
      disabled:cursor-not-allowed disabled:border-[#869EE933] disabled:bg-[#869EE933] disabled:text-white dark:disabled:text-iris-light/60 
      flex gap-2 justify-center items-center
      ${className} ${styles}`}
      data-attr={dataAttr ?? null}
    >
      {children}
    </button>
  );
};

export default Button;
