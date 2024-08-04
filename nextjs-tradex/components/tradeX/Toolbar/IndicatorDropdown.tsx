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

interface Indicator {
  value: string;
  label: string;
  selected: boolean;
}
interface IndDropdownProps {
  indicators?: Indicator[];
  setValue: (indicator: string) => void;
}

const IndicatorDropdown: React.FC<IndDropdownProps> = ({
  indicators = [],
  setValue
}) => {
  const [open, setOpen] = useState(false);

  // Safeguard to ensure indicators is an array
  const safeIndicators = Array.isArray(indicators) ? indicators : [];

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
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
              {safeIndicators.map((ind) => (
                <CommandItem
                  key={ind.value}
                  value={ind.value}
                  onSelect={() => {
                    setValue(ind.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      ind.selected ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {ind.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IndicatorDropdown;
