"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionItem } from "../containers/CreateForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Option } from "./FormRadioGroup";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Edit, Trash } from "lucide-react";
import { convetStringToSlug, isLabelValid } from "../utils";

type FormCheckBoxesProps = {
  question?: Partial<QuestionItem>;
  onChange?: (question: Partial<QuestionItem>) => void;
};
function FormCheckBoxes({ question, onChange }: FormCheckBoxesProps) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEditRef = useRef<HTMLInputElement>(null);
  const options = question?.options ?? [];
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
      onChange?.({
        ...question,
        options: [...options, option],
      });
      inputAddRef.current?.focus();
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
    inputEditRef.current?.focus();
    inputEditRef.current!.value = option?.label ?? "";
  };

  const handleUpdateOption = (label: string) => {
    const currentLabel = label;
    if (
      typeof currentLabel === "string" &&
      isLabelValid({ currentLabel, options })
    ) {
      const option = {
        id: convetStringToSlug(currentLabel),
        label: currentLabel,
      };
      const index = options.findIndex(
        (option) => option.id === editingOption?.id
      );
      const newOptions = [...options];
      newOptions[index] = option;
      onChange?.({
        ...question,
        options: newOptions,
      });
    }
    setEditingOption(null);
  };

  const handleOnCheck = (id: string) => {
    const option = options.find((option) => option.id === id);
    const index = options.findIndex((option) => option.id === id);
    const newOptions = [...options];
    const newOption = { ...option, isChecked: !option?.isChecked } as Option;
    newOptions[index] = newOption;
    onChange?.({
      ...question,
      options: newOptions,
    });
  };

  return (
    <div className="grid gap-4 w-full">
      {options.map(({ id, label, isChecked }) => (
        <div key={id} className="flex items-center gap-2 min-h-[40px]">
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
            <Checkbox
              key={id}
              id={id}
              defaultChecked={options.find((option) => option.id === id)?.isChecked}
              onCheckedChange={() => handleOnCheck(id)}
              checked={isChecked}
            />
            <Label htmlFor={id}>{label}</Label>
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
      <div className="flex gap-2">
        <Input placeholder="Add option" ref={inputAddRef} />
        <Button type="button" onClick={handleAddOption} variant={"ghost"}>
          Add option
        </Button>
      </div>
    </div>
  );
}

export { FormCheckBoxes };
