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
import { ChevronsUpDown } from 'lucide-react';
import { IIndicatorToolbar } from '../utils/types';
import { useChartContext } from '../provider/ChartProvider';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IndDropdownProps {
  indicators?: IIndicatorToolbar[];
  setValue: (indicator: string) => void;
}

const IndicatorDropdown: React.FC<IndDropdownProps> = ({
  indicators = [],
  setValue
}) => {
  const [open, setOpen] = useState(false);
  const{handleSwitchIndicator} =  useChartContext();

  // List of indicators to be filtered out
  const filterOutIndicators = ['VOL']; // Add or remove indicators as needed

  // Safeguard to ensure indicators is an array and filter out unwanted indicators
  const safeIndicators = Array.isArray(indicators) 
    ? indicators.filter(ind => !filterOutIndicators.includes(ind.value))
    : [];

  return (
    <div className="flex items-center space-x-4">
     {safeIndicators.length > 0 &&( <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={'toolbar'}
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between"
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
                  {ind.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>)}
      <Button 
      variant='secondary' 
      size='toolbar' 
      onClick={() => {
        handleSwitchIndicator('VOL')
      }}
    >
      <FontAwesomeIcon icon={faChartSimple} className="mr-2" /> Volume
    </Button>
    </div>
  );
};

export default IndicatorDropdown;
