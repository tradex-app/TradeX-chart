'use client';
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
import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IStatesToolbar } from '../utils/types';
import { useChartContext } from '../provider/ChartProvider';

const StateDropdown = () => {
  const [open, setOpen] = useState(false);
  const { states, setStates, chartX } = useChartContext();
  const [toolbarStates, setToolbarStates] = useState<IStatesToolbar[]>([]);

  useEffect(() => {
    if (states) {
      const mappedStates = states.map((state, index) => ({
        label: 'State: ' + (index + 1).toString(),
        value: state.key,
        selected: state.key === chartX?.state.key
      }));
      setToolbarStates(mappedStates);
    }
  }, [chartX?.state.key, states]);

  const handleSelectState = (stateKey: string) => {
    if (chartX) {
      chartX.state.use(stateKey);
      console.log(stateKey);
      const updatedStates = toolbarStates.map((state) =>
        state.value === stateKey
          ? { ...state, selected: !state.selected }
          : state
      );
      setToolbarStates(updatedStates);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && chartX) {
      const st = chartX.state.list();
      setStates(st);
    }
    setOpen(newOpen);
  };

  return (
    <div className="flex items-center mr-2">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={'toolbar'}
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between"
          >
            Select state...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search state..." />
            <CommandEmpty>No state found.</CommandEmpty>
            <CommandGroup>
              {toolbarStates.map((st) => (
                <CommandItem
                  key={st.value}
                  value={st.value}
                  onSelect={() => {
                    handleSelectState(st.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      st.selected ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {st.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StateDropdown;
