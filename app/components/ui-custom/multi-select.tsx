import { Check, ChevronDown, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Command, CommandInput, CommandItem, CommandList } from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { cn } from "~/lib/utils"



interface IProps {
  options: {
    id: number,
    title: string
  }[],
  selected: number[],
  onChange: (value: number[]) => void
}

export function MultiSelect({ options, selected, onChange }: IProps) {
  const [open, setOpen] = useState(false)

  const toggleValue = (value: number) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-auto justify-between"
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selected.map((id) => {
                const item = options.find((option) => option.id === id)
                if (!item) return null
                return (
                  <Badge
                    key={id}
                    variant="default"
                    className="flex items-center gap-1 pr-1"
                  >
                    {item.title}
                    <button
                      type="button"
                      onClick={() => {
                        onChange(selected.filter((i) => i !== id))
                      }}
                      className="ml-1 rounded-full group hover:bg-muted p-0.5 cursor-pointer"
                    >
                      <X className="h-3 w-3 text-background group-hover:text-accent-foreground" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          ) : (
            "Chọn khóa học"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm..." />
          <CommandList>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => toggleValue(option.id)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selected.includes(option.id) && "bg-primary text-accent-foreground"
                  )}
                >
                  {selected.includes(option.id) && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                {option.title}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
