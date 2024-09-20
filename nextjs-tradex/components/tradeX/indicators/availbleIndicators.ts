import { IIndicators } from 'tradex-chart';

import custom from './custom';

export const CUSTOM_INDICATORS: IIndicators = {
  custom: {
    id: 'custom',
    name: 'Custom',
    event: 'addIndicator',
    ind: custom
  }
};

export const SelectedIndicators = (
  selectedIndicators: string[]
): IIndicators => {
  const filteredIndicators: IIndicators = {};

  selectedIndicators.forEach((indicator) => {
    if (CUSTOM_INDICATORS[indicator]) {
      filteredIndicators[indicator] = CUSTOM_INDICATORS[indicator];
    }
  });
  return filteredIndicators;
};
