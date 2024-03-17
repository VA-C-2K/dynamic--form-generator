import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type FormHeaderProps = {
  value: {
    title: string;
    description: string;
  };
  onChange: (value: FormHeaderProps["value"]) => void;
};

const FormHeader = ({ value, onChange }: FormHeaderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>
          <Input
            type="text"
            placeholder="Untitled Form"
            name="title"
            onChange={handleChange}
            className="text-3xl font-semibold h-16"
            value={value?.title}
          />
        </CardTitle>
        <Input
          type="text"
          placeholder="Form Description"
          name="description"
          onChange={handleChange}
          value={value?.description}
        />
      </CardHeader>
    </Card>
  );
};

export { FormHeader };
