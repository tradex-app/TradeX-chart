import { IOverlay } from "../utils/types";
import DCA from "./dca";
import TEST from "./test";

const AVAILABLE_OVERlAYS: IOverlay = {
  DCA: {
    class: DCA,
    location: "chartPane",
  },
  TEST: {
    class: TEST,
    location: "chartPane",
  },
};

export const SelectedOverlays = (selectedOverlays: string[]): IOverlay => {
  const filteredOverlays: IOverlay = {};
  if (selectedOverlays) {
    selectedOverlays.forEach((overlay) => {
      if (AVAILABLE_OVERlAYS[overlay]) {
        filteredOverlays[overlay] = AVAILABLE_OVERlAYS[overlay];
      }
    });
    return filteredOverlays;
  }
};

export default AVAILABLE_OVERlAYS;
