import * as talib from "talib-web";
import ColorsEnum from "../../theme/colors";

export const CANDLE_THEME = {
  AreaLineColour: "#4c5fe7",
  AreaFillColour: ["#4c5fe780", "#4c5fe700"],

  UpBodyColour: ColorsEnum.Green,
  UpWickColour: ColorsEnum.Green,
  DnBodyColour: ColorsEnum.Primary,
  DnWickColour: ColorsEnum.Primary,
};

const getConfig = ({
  type = "area",
  title,
  symbol,
  rangeLimit = 96,
  isLightTheme,
}) => {
  return {
    title,
    symbol,
    utils: {},
    tools: {},
    range: {
      initialCnt: rangeLimit,
      limitPast: 96 / 12,
      limitFuture: 96,
    },
    theme: {
      candle: {
        ...CANDLE_THEME,
        Type: type,
      },
      volume: {
        Height: 15,
        UpColour: "#4bc67c",
        DnColour: "#2e384f",
      },
      xAxis: {
        colourTick: "#6a6f80",
        colourLabel: "#6a6f80",
        colourCursor: "#2A2B3A",
        colourCursorBG: "#aac0f7",
        slider: "#586ea6",
        handle: "#586ea688",
        tickMarker: false,
      },
      yAxis: {
        colourTick: "#6a6f80",
        colourLabel: "#6a6f80",
        colourCursor: "#2A2B3A",
        colourCursorBG: "#aac0f7",
        tickMarker: false,
        location: "right",
      },
      chart: {
        Background: "#0f121300",
        BorderColour: "#00000000",
        BorderThickness: 1,
        GridColour: isLightTheme
          ? ColorsEnum.SelectorLight
          : ColorsEnum.Selector,
        TextColour: "#6a6f80",
      },
      onChart: {},
      offChart: {},
      time: {
        navigation: false,
        colour: "#96a9db",
        handleColour: "#586ea6",
      },
      legend: {
        colour: "#96a9db",
        controls: true,
      },
      icon: {
        colour: "#748bc7",
        hover: "#96a9db",
      },
      tools: {
        location: false,
      },
      utils: {
        location: false,
      },
    },
    trades: {
      display: true,
      displayInfo: true,
    },
    deepValidate: false,
    isCrypto: true,
    logs: true,
    infos: true,
    warnings: true,
    errors: true,
    maxCandleUpdate: 250,
    talib,
    wasm: `${window.location.origin}/talib.wasm`,
  };
};

export default getConfig;
