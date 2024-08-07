import { useState } from 'react';

interface IIndicator {
  name: string;
  type: string;
  data: number[];
}

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
  const [chartX, setChartX] = useState(null);

  const [data, setData] = useState([]);

  const getIndicators = () => {
    if (!chartX) return;

    return Object.values(chartX.Indicators);
  };

  const getIndicatorId = (indicatorType: string) => {
    const chartIndicators = getIndicators();
    return chartIndicators.length > 0
      ? Object.keys(chartIndicators[0]).find((key) =>
          key.toLowerCase().includes(indicatorType.toLowerCase())
        )
      : undefined;
  };

  const handleAddIndicator = (indicator) => {
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

  const handleMergeData = (data: number[]) => {
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
