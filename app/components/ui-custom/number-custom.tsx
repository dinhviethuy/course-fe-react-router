import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Button } from 'react-aria-components';
import CurrencyInput, { type CurrencyInputProps } from 'react-currency-input-field';
import { Controller, type Control } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";


interface IProps {
  minValue?: number
  maxValue?: number
  label?: string,
  control: Control<any>
  name: string,
  disabled?: boolean,
  custom?: CurrencyInputProps
  step?: number
}

export default function NumberCustom({ minValue, maxValue, label, control, name, disabled, custom, step = 1 }: IProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = 0, onChange } }) => {

        const handleIncrement = () => {
          const next = Math.min((value ?? 0) + step, maxValue ?? Infinity)
          onChange(next)
        }

        const handleDecrement = () => {
          const next = Math.max((value ?? 0) - step, minValue ?? -Infinity)
          onChange(next)
        }

        return (
          <div className="*:not-first:mt-2">
            <Label className="text-foreground text-sm font-medium">{label}</Label>
            <div className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
              <CurrencyInput
                value={value}
                disabled={disabled}
                {...custom}
                className={cn("dark:bg-input/30 text-foreground flex-1 px-3 py-2 tabular-num forcus:border-none outline-none", {
                  "opacity-50": disabled
                })}
                onValueChange={(_, __, values) => {
                  if (values?.float) {
                    if (maxValue && values.float > maxValue) {
                      onChange(maxValue)
                    } else {
                      onChange(values?.float ?? 0)
                    }
                  } else {
                    onChange(0)
                  }
                }}
              />
              <div className="flex h-[calc(100%+2px)] flex-col">
                <Button
                  onPress={handleIncrement}
                  type="button"
                  className="border-input dark:bg-input/30 text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  isDisabled={disabled || (maxValue !== undefined && value >= maxValue)}
                >
                  <ChevronUpIcon size={12} aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  onPress={handleDecrement}
                  className="border-input dark:bg-input/30 text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  isDisabled={disabled || (minValue !== undefined && value <= minValue)}
                >
                  <ChevronDownIcon size={12} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}
