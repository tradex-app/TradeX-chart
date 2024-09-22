import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IIndicator, ITradeX } from '../../../../types';
import { IStatesToolbar } from '../utils/types';

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

interface ChartContextProps {
  chartX: ITradeX | undefined;
  setChartX: React.Dispatch<React.SetStateAction<ITradeX | undefined>>;
  states: IStatesToolbar[] | undefined;
  setStates: React.Dispatch<React.SetStateAction<IStatesToolbar[] | undefined>>;
  handleMergeData: (newData: number[]) => void;
  getIndicatorId: (indicatorType: string) => string | undefined;
  getIndicators: () => any[];
  handleAddIndicator: (
    indicatorClass: any,
    indicatorName: any,
    indicatorProps: any
  ) => void;
  handleRemoveIndicator: (indicatorId: string) => void;
  handleSwitchIndicator: (indicatorId: string) => void;
  handleCreateState: CreateStateType;
  handleUseState: (id: string) => void;
}

const ChartContext = createContext<ChartContextProps | undefined>(undefined);

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const [chartX, setChartX] = useState<ITradeX>();
  const [states, setStates] = useState<IStatesToolbar[]>();

  const getIndicators = () => {
    if (!chartX) return [];
    return chartX.Indicators ? Object.values(chartX.Indicators) : [];
  };

  const getIndicatorId = (indicatorType: string) => {
    const chartIndicators = getIndicators();
    if (chartIndicators && chartIndicators.length > 0) {
      return Object.keys(chartIndicators[0]).find((key) =>
        key.toLowerCase().includes(indicatorType.toLowerCase())
      );
    }
    return undefined;
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

  const handleSwitchIndicator = (indicatorType: string) => {
    const id = getIndicatorId(indicatorType);
    if (id) {
      handleRemoveIndicator(id);
    } else {
      const indicatorClass = indicatorType;
      const indicatorProps = {};
      handleAddIndicator(indicatorClass, indicatorType, indicatorProps);
    }
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

  return (
    <ChartContext.Provider
      value={{
        chartX,
        setChartX,
        states,
        setStates,
        handleMergeData,
        getIndicatorId,
        getIndicators,
        handleAddIndicator,
        handleRemoveIndicator,
        handleSwitchIndicator,
        handleCreateState,
        handleUseState
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

// Custom hook for consuming the context
export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }
  return context;
};
