import { CandleStickSvg, GraphSvg } from "./ChartSwicthSvg";
import withThemeSvg from "../withThemeSvg";

const TokenSpecificGraph = ({ color = "#7A7F93" }) => (
  <svg
    width="1.2rem"
    height="1.2rem"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.5 4.22217L14.8334 10.8888L10.1667 6.22212L4.72217 11.6666L3.5 10.4444L10.1667 3.77778L14.8334 8.44448L20.2778 3L21.5 4.22217Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.79671 16.1482V21.0742H4.2041V16.1482H6.79671Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4627 10.7037V21.0741H8.87012V10.7037H11.4627Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.1297 16.1482V21.0742H13.5371V16.1482H16.1297Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.7967 10.7037V21.0741H18.2041V10.7037H20.7967Z"
      fill={color}
    />
  </svg>
);

const TokenSpecificCandle = ({ color = "white" }) => (
  <svg
    width="1.2rem"
    height="1.2rem"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5 4H21.5V20H18.5V4ZM3.5 13H6.5V20H3.5V13ZM14.5 4H17.5V7H14.5V4ZM10.5 5H13.5V9H10.5V5ZM7.5 10H10.5V14H7.5V10Z"
      fill={color}
    />
  </svg>
);

const ChartSwitchSvg = ({
  name,
  color,
  type = "",
}: {
  name: string;
  color?: string;
  type?: string;
}) => {
  if (type === "token-specific") {
    switch (name) {
      case "graph":
        return <TokenSpecificGraph color={color} />;
      case "candlestick":
        return <TokenSpecificCandle color={color} />;
      default:
        return <TokenSpecificCandle color={color} />;
    }
  }

  switch (name) {
    case "graph":
      return <GraphSvg color={color} />;
    case "candlestick":
      return <CandleStickSvg color={color} />;
    default:
      return <CandleStickSvg color={color} />;
  }
};

const DatePickerSvg = ({ color = "#7A7F93" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.0833 2.33334H2.91667C2.27233 2.33334 1.75 2.85568 1.75 3.50001V11.6667C1.75 12.311 2.27233 12.8333 2.91667 12.8333H11.0833C11.7277 12.8333 12.25 12.311 12.25 11.6667V3.50001C12.25 2.85568 11.7277 2.33334 11.0833 2.33334Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33337 1.16666V3.49999"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66663 1.16666V3.49999"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.75 5.83334H12.25"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CameraSvg = ({
  width = "1.8rem",
  height = "1.8rem",
  color = "#ffffff",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FullScreenSvg = ({ color = "#ffffff" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.66667 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V4.66667M12.25 4.66667V2.91667C12.25 2.60725 12.1271 2.3105 11.9083 2.09171C11.6895 1.87292 11.3928 1.75 11.0833 1.75H9.33333M9.33333 12.25H11.0833C11.3928 12.25 11.6895 12.1271 11.9083 11.9083C12.1271 11.6895 12.25 11.3928 12.25 11.0833V9.33333M1.75 9.33333V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H4.66667"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterSvgSecond = ({
  color = "#7A7F93",
  width = "1.23rem",
  height = "1.23rem",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.66675 14V9.33334"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66675 6.66667V2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14V8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.33333V2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 14V10.6667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 8V2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.666748 9.33334H4.66675"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.33334H10"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 10.6667H15.3333"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArrowLeft = ({ w = 16, h = 16, color = "white" }) => (
  <svg
    width={w}
    height={h}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill={color}
      d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
    />
  </svg>
);

const ArrowRight = ({ w = 16, h = 16, color = "white" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w}
    height={h}
    viewBox="0 0 448 512"
  >
    <path
      fill={color}
      d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
    />
  </svg>
);

const EditSvg = ({ color = "white" }) => (
  <svg
    width="1rem"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.3335 3.16699H2.66683C2.31321 3.16699 1.97407 3.30747 1.72402 3.55752C1.47397 3.80756 1.3335 4.1467 1.3335 4.50033V13.8337C1.3335 14.1873 1.47397 14.5264 1.72402 14.7765C1.97407 15.0265 2.31321 15.167 2.66683 15.167H12.0002C12.3538 15.167 12.6929 15.0265 12.943 14.7765C13.193 14.5264 13.3335 14.1873 13.3335 13.8337V9.16699"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.3335 2.16714C12.5987 1.90193 12.9584 1.75293 13.3335 1.75293C13.7086 1.75293 14.0683 1.90193 14.3335 2.16714C14.5987 2.43236 14.7477 2.79207 14.7477 3.16714C14.7477 3.54222 14.5987 3.90193 14.3335 4.16714L8.00016 10.5005L5.3335 11.1671L6.00016 8.50048L12.3335 2.16714Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export {
  ChartSwitchSvg,
  DatePickerSvg,
  CameraSvg,
  FullScreenSvg,
  FilterSvgSecond,
  ArrowLeft,
  EditSvg,
  ArrowRight,
};

export const DatePickerSvgTheme = withThemeSvg(DatePickerSvg);
export const CameraSvgTheme = withThemeSvg(CameraSvg);
export const FullScreenSvgTheme = withThemeSvg(FullScreenSvg);
export const ChartSwitchSvgTheme = withThemeSvg(ChartSwitchSvg);
export const FilterSvgSecondTheme = withThemeSvg(FilterSvgSecond);
export const ArrowLeftTheme = withThemeSvg(ArrowLeft);
export const ArrowRightTheme = withThemeSvg(ArrowRight);
export const EditSvgTheme = withThemeSvg(EditSvg);
