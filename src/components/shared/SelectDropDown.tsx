import { useEffect, useState } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface SelectDropDownProps<T extends FieldValues, TOption = string> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  options: TOption[];
  getLabel: (option: TOption) => string;
  getValue: (option: TOption) => string;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (search: string) => void;
  searchDebounceMs?: number;
  isLoading?: boolean;
  emptyMessage?: string;
  id?: string;
}

const SelectDropDown = <T extends FieldValues, TOption = string>({
  control,
  name,
  label,
  options,
  getLabel,
  getValue,
  placeholder = "Select an option",
  disabled = false,
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  searchDebounceMs = 300,
  isLoading = false,
  emptyMessage = "No options found.",
  id,
}: SelectDropDownProps<T, TOption>) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!searchable || !onSearch) return;

    const timer = setTimeout(() => {
      onSearch(search.trim());
    }, searchDebounceMs);

    return () => clearTimeout(timer);
  }, [search, searchable, onSearch, searchDebounceMs]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSearch("");
      onSearch?.("");
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedOption = field.value as TOption | null | undefined;

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel htmlFor={id ?? field.name}>{label}</FieldLabel>
            )}

            <Popover open={open} onOpenChange={handleOpenChange}>
              <PopoverTrigger
                render={
                  <button
                    id={id ?? field.name}
                    type="button"
                    role="combobox"
                    aria-expanded={open}
                    aria-invalid={fieldState.invalid}
                    disabled={disabled}
                    onBlur={field.onBlur}
                    className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-normal shadow-xs outline-none hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="truncate">
                      {selectedOption != null
                        ? getLabel(selectedOption)
                        : placeholder}
                    </span>

                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </button>
                }
              />

              <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                <Command shouldFilter={false}>
                  {searchable && (
                    <CommandInput
                      placeholder={searchPlaceholder}
                      value={search}
                      onValueChange={setSearch}
                    />
                  )}

                  <CommandList>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <LoaderCircle className="size-4 animate-spin" />
                      </div>
                    ) : options.length === 0 ? (
                      <CommandEmpty>{emptyMessage}</CommandEmpty>
                    ) : (
                      options.map((option) => (
                        <CommandItem
                          key={getValue(option)}
                          value={getValue(option)}
                          onSelect={() => {
                            field.onChange(option);
                            field.onBlur();
                            handleOpenChange(false);
                          }}
                        >
                          <Check
                            className={`mr-2 size-4 ${
                              selectedOption != null &&
                              getValue(selectedOption) === getValue(option)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {getLabel(option)}
                        </CommandItem>
                      ))
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default SelectDropDown;
