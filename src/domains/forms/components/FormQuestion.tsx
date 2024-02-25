import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormQuestionType } from "./FormQuestionType";
import { FormQuestionInput } from "./FormQuestionInput";
import { QuestionItem } from "../containers/CreateForm";

type FormQuestionProps = {
  question: QuestionItem;
  onChange: (question: Partial<QuestionItem>) => void;
};
const FormQuestion = ({ question, onChange }: FormQuestionProps) => {
  const { questionType } = question;
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>
          <Input
            type="text"
            placeholder="Question"
            name="question"
            onChange={(e) =>
              onChange({ ...question, question: e.target.value })
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 justify-between items-start">
        <FormQuestionInput question={question} onChange={onChange} />
        <FormQuestionType
          value={questionType}
          onChange={(value) =>
            onChange({
              ...question,
              questionType: value,
            })
          }
        />
      </CardContent>
    </Card>
  );
};

export default FormQuestion;
