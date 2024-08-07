'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ChartResolutionEnum } from '../utils/enums';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface IProps {
  interval: any;
  setValue: (value: any) => void;
  styles?: string;
  intervals?: string[];
}

const createIntervalOptions = (
  intervals = ['1m', '5m', '15m', '30m', '1h', '12h', '1d']
): { value: string; label: string }[] => {
  return intervals.map((interval: string) => ({
    value: interval,
    label:
      interval === '1d'
        ? '1 day'
        : interval === '1w'
          ? '1 week'
          : interval.substring(0, interval.length - 1) +
            ' ' +
            (interval.endsWith('m') ? 'min' : 'hour')
  }));
};

const IntervalDropdown: React.FC<IProps> = ({
  interval,
  setValue,
  styles = '',
  intervals = ['1m', '5m', '15m', '30m', '1h', '12h', '1d']
}) => {
  const [open, setOpen] = React.useState(false);
  const intervalOptions = createIntervalOptions(intervals);
  return (
    <div className={`flex items-center space-x-4 ${styles}`}>
      {intervalOptions.length > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={'sm'}
              role="combobox"
              aria-expanded={open}
              className="w-[85px] justify-between"
            >
              {intervalOptions.find(
                (item: { value: any }) => item.value === interval
              )?.label || 'Select interval...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search interval..." />
              <CommandEmpty>No interval found.</CommandEmpty>
              <CommandGroup>
                {intervalOptions.map(
                  (item: {
                    value: React.Key | null | undefined;
                    label:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  }) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(selectedValue) => {
                        setValue(selectedValue as ChartResolutionEnum);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          interval === item.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  )
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default IntervalDropdown;
