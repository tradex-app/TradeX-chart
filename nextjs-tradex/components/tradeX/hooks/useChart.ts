import { useState } from 'react';
import { IIndicator, ITradeX } from '../../../../types'; // import from 'tradex-chart';
import { IStatesToolbar } from '../utils/types';

/// DEPRECATED IN FAVOR OF CONTEXT

type CreateStateType = (state: IState) => string;

interface IState {
  chart?: {
    type: string;
    candleType: string;
  };
  candleType?: string;
  type?: string;
  primary: IIndicator[];
}

const useChart = () => {
  const [chartX, setChartX] = useState<ITradeX>();
  const [states, setStates] = useState<IStatesToolbar[]>();

  const getIndicators = () => {
    if (!chartX) return;
    console.log(chartX.Indicators);

    return chartX.Indicators ? Object.values(chartX.Indicators) : [];
  };

  const getIndicatorId = (indicatorType: string) => {
    const chartIndicators = getIndicators();
    if (chartIndicators && chartIndicators?.length > 0) {
      Object.keys(chartIndicators[0]).find((key) =>
        key.toLowerCase().includes(indicatorType.toLowerCase())
      );
    }
  };

  const handleAddIndicator = (
    indicatorClass: any,
    indicatorName: any,
    indicatorProps: any
  ): any => {
    if (!chartX) return;

    chartX.addIndicator(indicatorClass, indicatorName, indicatorProps);
    chartX?.refresh?.();
  };

  const handleRemoveIndicator = (indicatorId: string) => {
    if (!chartX) return;
    chartX.removeIndicator(indicatorId);
  };

  const handleCreateState: CreateStateType = (state: IState) => {
    if (!chartX) return '';
    return chartX.state.create(undefined);
  };

  const handleUseState = (id: string) => {
    if (!chartX) return;
    chartX.state.use(id);
  };

  const handleMergeData = (newData: number[]) => {
    if (!chartX) return;
    chartX.mergeData?.({ ohlcv: newData });
  };

  // const resetData = () => {
  //   if (!chartX) return false;
  //   chartX?.expunge();
  //   return true;
  // };

  const listStates = () => {
    if (!chartX) return false;
    return chartX.state.list();
  };

  return {
    chartX,
    setChartX,
    handleMergeData,
    // resetData,
    // indicators
    getIndicatorId,
    getIndicators,
    handleAddIndicator,
    handleRemoveIndicator,
    // state
    states,
    setStates,
    listStates,
    handleCreateState,
    handleUseState
  };
};

export default useChart;
