import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef, useState } from "react";
import { QuestionItem } from "../containers/CreateForm";
import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

type MultipleOptions = Option[];
const convetStringToSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const checkIfOptionExists = (options: Option[], label: string) => {
  return options.some((option) => option.label.trim() === label.trim());
};

const isLabelValid = ({
  currentLabel,
  options,
}: {
  currentLabel: string;
  options: Option[];
}) => {
  return (
    typeof currentLabel === "string" &&
    currentLabel.length > 0 &&
    !checkIfOptionExists(options, currentLabel)
  );
};

type FormRadioGroupProps = {
  question?: Partial<QuestionItem>;
  onChange?: (question: Partial<QuestionItem>) => void;
};
function FormRadioGroup({ question, onChange }: FormRadioGroupProps) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEditRef = useRef<HTMLInputElement>(null);
  const options = question?.options || [];
  const [editingOption, setEditingOption] = useState<Option | null>(null);
  const handleAddOption = () => {
    const currentLabel = inputAddRef?.current?.value;
    if (
      typeof currentLabel === "string" &&
      isLabelValid({ currentLabel, options })
    ) {
      const option = {
        value: convetStringToSlug(currentLabel),
        label: currentLabel,
      };
      onChange &&
        onChange?.({
          ...question,
          options: [...options, option],
        });
      inputAddRef.current!.value = "";
    }
  };

  const handleRemoveOption = (value: string) => {
    onChange?.({
      ...question,
      options: options.filter((option) => option.value !== value),
    });
  };

  const handleEditOption = (value: string) => {
    const option = options.find((option) => option.value === value);
    setEditingOption(option ?? null);
  };

  const handleUpdateOption = (newLabel: string) => {
    if (
      typeof newLabel === "string" &&
      isLabelValid({ currentLabel: newLabel, options })
    ) {
      const newValue = convetStringToSlug(newLabel);
      const newOptions = options.map((option) => {
        if (option.value === editingOption?.value) {
          return {
            ...option,
            value: newValue,
            label: newLabel,
          };
        }
        return option;
      });
      onChange?.({
        ...question,
        options: newOptions,
      });
    }
    setEditingOption(null);
  };

  return (
    <div className="grid gap-4">
      <RadioGroup className="grid grid-4 w-full">
        {options.map(({ label, value }) => (
          <div key={value} className="grid grid-cols-2 gap-2 min-h-[40px]">
            <div className="flex items-center gap-2">
              <Input
                defaultValue={editingOption?.label}
                className={cn("hidden", {
                  block: editingOption?.value === value,
                  "border border-input": editingOption?.value !== value,
                  "border border-primary": editingOption?.value === value,
                })}
                ref={inputEditRef}
                onBlur={(e) => handleUpdateOption(e.target.value ?? "")}
              />
              <div
                className={cn("flex items-center gap-2", {
                  hidden: editingOption?.value === value,
                })}
              >
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value}>{label}</Label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Trash
                className="cursor-pointer"
                onClick={() => handleRemoveOption(value)}
              />
              <Edit
                className="cursor-pointer"
                onClick={() => handleEditOption(value)}
              />
            </div>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-2">
        <Input placeholder="Add option" ref={inputAddRef} />
        <Button type="button" onClick={handleAddOption} variant={"ghost"}>
          Add option
        </Button>
      </div>
    </div>
  );
}
export type { Option, MultipleOptions };
export { FormRadioGroup };
