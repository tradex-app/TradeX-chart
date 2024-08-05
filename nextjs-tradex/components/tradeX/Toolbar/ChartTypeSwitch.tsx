'use client';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface IOption {
  id: number;
  label: string;
  value: number | string;
  info?: string;
  icon?: any;
}

interface IProps {
  value: IOption;
  items: IOption[];
  onChange: (value: IOption) => void;
}

const ChartTypeSwitch: React.FC<IProps> = ({ onChange, items, value }) => {
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
