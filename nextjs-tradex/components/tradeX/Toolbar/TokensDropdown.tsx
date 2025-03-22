'use client';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useState } from 'react';

const TokensDropdown = ({ tokensList, value, setValue }: any) => {
  const [open, setOpen] = useState(false);
  const tokens = tokensList.map((token: string) => ({
    value: token,
    label: token
  }));
  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={'toolbar'}
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-between"
          >
            {value
              ? tokens.find((token: { value: any }) => token.value === value)
                  ?.label
              : 'Select token...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search token..." />
            <CommandEmpty>No token found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {tokens.map((token: { value: any; label: any }) => (
                  <CommandItem
                    key={token.value}
                    value={token.value}
                    onSelect={(currentValue) => {
                      if (currentValue === value) return;
                      setValue(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === token.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {token.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <Command></Command>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TokensDropdown;
