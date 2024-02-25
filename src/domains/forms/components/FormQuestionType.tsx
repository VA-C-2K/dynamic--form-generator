"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
type QuestionType = "text" | "multiple-choice" | "checkbox";
const questionTypes = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "multiple-choice",
    label: "Multiple Choice",
  },
  {
    value: "checkbox",
    label: "Checkbox",
  },
] as Array<{ value: QuestionType; label: string }>;

type FormQuestionProps = {
  value?: QuestionType;
  onChange: (value: QuestionType) => void;
};

function FormQuestionType({ value, onChange }: FormQuestionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? questionTypes.find((questionType) => questionType.value === value)
                ?.label
            : "Select question type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Question Type..." className="h-9" />
          <CommandEmpty>No option Found.</CommandEmpty>
          <CommandGroup>
            {questionTypes.map((questionType) => (
              <CommandItem
                key={questionType.value}
                value={questionType.value}
                onSelect={(currentValue: string) => {
                  onChange(currentValue as QuestionType);
                  setOpen(false);
                }}
              >
                {questionType.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export type { QuestionType };
export { FormQuestionType };
