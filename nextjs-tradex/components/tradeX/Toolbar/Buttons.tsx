'use client';

import { Button } from '@/components/ui/button';
import { useChartContext } from '../provider/ChartProvider';

export const CreateState = () => {
  const { chartX } = useChartContext();
  if (!chartX) return null;

  return (
    <Button 
        variant='secondary' 
        size='toolbar'
        onClick={() => {
            chartX.state.create(undefined)}}>
      Create State
    </Button>
  );
};

export const PrintState = () => {
  const { chartX } = useChartContext();
  if (!chartX) return null;

  return (
    <Button 
      variant='secondary' 
      size='toolbar' 
      onClick={() => {
        const list = chartX.state.list();
        console.log(list);
      }}
    >
      Print State
    </Button>
  );
};