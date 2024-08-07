import { IIndicators } from 'tradex-chart';
import TradeFlow from './TRDFLO';

const AVAILABLE_INDICATORS: IIndicators = {
  TRDFLO: {
    id: 'TRDFLO',
    name: 'Trade Flow',
    event: 'addIndicator',
    ind: undefined //TradeFlow
  }
  /// ADD NEW INDICATORS HERE
};

export const SelectedIndicators = (
  selectedIndicators: string[]
): IIndicators => {
  const filteredIndicators: IIndicators = {};

  selectedIndicators.forEach((indicator) => {
    if (AVAILABLE_INDICATORS[indicator]) {
      filteredIndicators[indicator] = AVAILABLE_INDICATORS[indicator];
    }
  });
  return filteredIndicators;
};

export default AVAILABLE_INDICATORS;
