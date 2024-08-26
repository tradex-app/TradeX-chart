import { useState } from 'react';
import { IIndicator } from '../../../../types'; // import from 'tradex-chart';
import emptyChart from './emptyChart';

type CreateStateType = (state: IState) => string;

interface IState {
  chart?: {
    type: string;
    candleType: string;
  };
  candleType?: string;
  type?: string;
  data: number[];
  primary: IIndicator[];
}

const useChart = () => {
  const [chartX, setChartX] = useState<any>(emptyChart);

  const [data, setData] = useState<number[][]>([]);

  const getIndicators = () => {
    if (!chartX) return;

    return Object.values(chartX.Indicators);
  };

  const getIndicatorId = (indicatorType: string) => {
    const chartIndicators = getIndicators() as Record<string, unknown>[];
    if (chartIndicators && chartIndicators?.length > 0) {
      Object.keys(chartIndicators[0]).find((key) =>
        key.toLowerCase().includes(indicatorType.toLowerCase())
      );
    }
  };

  const handleAddIndicator = (indicator: {
    value: any;
    name: any;
    data: any;
    customSettings: any;
  }) => {
    if (!chartX) return;

    chartX.addIndicator(indicator.value, indicator.name, {
      data: indicator.data || [],
      settings: {
        custom: indicator.customSettings
      }
    });

    chartX.refresh();
  };

  const handleRemoveIndicator = (indicatorId: string) => {
    if (!chartX) return;
    chartX.removeIndicator(indicatorId);
  };

  const handleCreateState: CreateStateType = (state) => {
    if (!chartX) return;
    return chartX.state.create(state);
  };

  const handleUseState = (id: string) => {
    if (!chartX) return;
    chartX.state.use(id);
  };

  const handleMergeData = (data: number[][]) => {
    if (!chartX) return;
    chartX.mergeData({ ohlcv: data });
  };

  const resetData = () => {
    if (!chartX) return false;
    chartX.expunge();
    return true;
  };

  return {
    chartX,
    setChartX,
    // data
    data,
    setData,
    handleMergeData,
    resetData,
    // indicators
    getIndicatorId,
    getIndicators,
    handleAddIndicator,
    handleRemoveIndicator,
    // state
    handleCreateState,
    handleUseState
  };
};

export default useChart;
