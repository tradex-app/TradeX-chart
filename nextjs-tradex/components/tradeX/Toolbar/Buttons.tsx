'use client';

import { Button } from '@/components/ui/button';
import { useChartContext } from '../provider/ChartProvider';

export const PrintState = () => {
  const { chartX } = useChartContext();
  if (!chartX) return null;

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="toolbar"
        onClick={() => {
          const list = chartX.state.list();
          console.log(list);
        }}
      >
        Print States
      </Button>
      <Button
        variant="secondary"
        size="toolbar"
        onClick={() => {
          const list = chartX.state.list();
          const currentState = chartX.state.key;
          list.forEach((state) => {
            if (state.key !== currentState) {
              console.log('Deleting', state.key);
              const success = chartX.state.delete(state.key);
              console.log('Deleted', success);
            }
          });
        }}
      >
        Delete States
      </Button>
      <Button
        variant="secondary"
        size="toolbar"
        onClick={() => {
          const currentState = chartX.state.key;
          const success = chartX.state.delete(currentState);
          console.log('Deleted', success);
        }}
      >
        Delete Current State
      </Button>
    </div>
  );
};
