import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { IState, ITradeX } from '../../../../types';

interface ChartContextProps {
  chartX: ITradeX | undefined;
  setChartX: React.Dispatch<React.SetStateAction<ITradeX | undefined>>;
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
}

const ChartContext = createContext<ChartContextProps | undefined>(undefined);

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const [chartX, setChartX] = useState<ITradeX>();

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

  const handleMergeData = (newData: number[]) => {
    if (!chartX) return;
    chartX.mergeData?.({ ohlcv: newData });
  };

  return (
    <ChartContext.Provider
      value={{
        chartX,
        setChartX,
        handleMergeData,
        getIndicatorId,
        getIndicators,
        handleAddIndicator,
        handleRemoveIndicator,
        handleSwitchIndicator
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }
  return context;
};
