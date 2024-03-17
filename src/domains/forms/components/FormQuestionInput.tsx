import { Input } from "@/components/ui/input";
import { QuestionType } from "./FormQuestionType";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormCheckBoxes } from "./FormCheckBoxes";
import { QuestionItem } from "../containers/DynamicForm";

type FormQuestionInputProps = {
  question: QuestionItem;
  onChange: (question: Partial<QuestionItem>) => void;
};

const inputs = ({
  question,
  onChange,
}: FormQuestionInputProps): Record<QuestionType, JSX.Element> => ({
  text: (
    <Input
      type="text"
      placeholder="Question"
      name="question"
      value={question?.text}
      onChange={(e) => onChange({ ...question, question: e.target.value })}
    />
  ),
  "multiple-choice": <FormRadioGroup question={question} onChange={onChange} />,
  checkbox: <FormCheckBoxes question={question} onChange={onChange} />,
});

const FormQuestionInput = (props: FormQuestionInputProps) => {
  return inputs(props)[props.question.questionType];
};
export { FormQuestionInput };
