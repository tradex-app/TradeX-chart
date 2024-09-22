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
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IStatesToolbar } from '../utils/types';

interface StateDropdownProps {
  states?: IStatesToolbar[];
  setValue: (indicator: string) => void;
}

const StateDropdown: React.FC<StateDropdownProps> = ({
  states = [],
  setValue
}) => {
  const [open, setOpen] = useState(false);

  const safeStates = Array.isArray(states) ? states : [];

  return (
    <div className="flex items-center space-x-4">
      {safeStates.length > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={'toolbar'}
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              Select indicator...
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search indicator..." />
              <CommandEmpty>No ind found.</CommandEmpty>
              <CommandGroup>
                {states.map((state) => (
                  <CommandItem
                    key={state.value}
                    value={state.value}
                    onSelect={() => {
                      setValue(state.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        state.selected ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {state.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default StateDropdown;
