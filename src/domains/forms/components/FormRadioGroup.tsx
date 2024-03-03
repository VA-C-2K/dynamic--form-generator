import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef, useState } from "react";
import { QuestionItem } from "../containers/CreateForm";
import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { convetStringToSlug, isLabelValid } from "../utils";

type Option = {
  id: string;
  label: string;
  isChecked?: boolean;
};

type MultipleOptions = Option[];

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
        id: convetStringToSlug(currentLabel),
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

  const handleRemoveOption = (id: string) => {
    onChange?.({
      ...question,
      options: options.filter((option) => option.id !== id),
    });
  };

  const handleEditOption = (id: string) => {
    const option = options.find((option) => option.id === id);
    setEditingOption(option ?? null);
  };

  const handleUpdateOption = (newLabel: string) => {
    if (
      typeof newLabel === "string" &&
      isLabelValid({ currentLabel: newLabel, options })
    ) {
      const newId = convetStringToSlug(newLabel);
      const newOptions = options.map((option) => {
        if (option.id === editingOption?.id) {
          return {
            ...option,
            id: newId,
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
        {options.map(({ label, id }) => (
          <div key={id} className="grid grid-cols-2 gap-2 min-h-[40px]">
            <div className="flex items-center gap-2">
              <Input
                defaultValue={editingOption?.label}
                className={cn("hidden", {
                  block: editingOption?.id === id,
                  "border border-input": editingOption?.id !== id,
                  "border border-primary": editingOption?.id === id,
                })}
                ref={inputEditRef}
                onBlur={(e) => handleUpdateOption(e.target.value ?? "")}
              />
              <div
                className={cn("flex items-center gap-2", {
                  hidden: editingOption?.id === id,
                })}
              >
                <RadioGroupItem value={id} id={id} />
                <Label htmlFor={id}>{label}</Label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Trash
                className="cursor-pointer"
                onClick={() => handleRemoveOption(id)}
              />
              <Edit
                className="cursor-pointer"
                onClick={() => handleEditOption(id)}
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
