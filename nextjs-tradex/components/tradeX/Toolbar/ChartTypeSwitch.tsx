'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IChartOption } from '../utils/types';

interface IProps {
  value: IChartOption;
  items: IChartOption[];
  onChange: (value: IChartOption) => void;
}

const ChartTypeSwitch = ({ onChange, items, value }: IProps) => {
  return (
    <Tabs defaultValue={value.label.toUpperCase()} className="w-[400px]">
      <TabsList>
        <TabsTrigger onClick={() => onChange(items[0])} value="CANDLE">
          Candles
        </TabsTrigger>
        <TabsTrigger onClick={() => onChange(items[1])} value="LINE">
          Lines
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChartTypeSwitch;
