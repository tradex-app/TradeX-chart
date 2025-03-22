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
    <Tabs
      defaultValue={value.label.toUpperCase()}
      className="pr-2 rounded-none"
    >
      <TabsList className="h-7 rounded-none">
        <TabsTrigger
          className="h-5 rounded-none"
          onClick={() => onChange(items[0])}
          value="CANDLE"
        >
          Candles
        </TabsTrigger>
        <TabsTrigger
          className="h-5 rounded-none"
          onClick={() => onChange(items[1])}
          value="LINE"
        >
          Lines
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChartTypeSwitch;
