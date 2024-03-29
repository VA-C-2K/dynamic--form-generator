"use client";
import { useState } from "react";
import { FormHeader } from "../components/FormHeader";
import FormQuestion from "../components/FormQuestion";
import { Button } from "@/components/ui/button";
import { QuestionType } from "../components/FormQuestionType";
import { MultipleOptions } from "../components/FormRadioGroup";
import { v4 as uuidv4 } from "uuid";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

// type Question = {

// }

type QuestionItem = {
  id: string;
  questionType: QuestionType;
  question: string;
  text?: string;
  options?: MultipleOptions;
};
type Form = {
  id?: string;
  title: string;
  description: string;
  questions: QuestionItem[];
};
type DynamicFormProps = {
  session: Session | null;
  form?: Form;
};
const DynamicForm = ({ session, form }: DynamicFormProps) => {
  const supabase = createClientComponentClient();
  const user = session?.user;
  const [{ title, description, questions }, setForm] = useState<Form>(
    form ?? {
      title: "",
      description: "",
      questions: [],
    }
  );

  const handleAddQuestion = () => {
    const question: QuestionItem = {
      id: uuidv4(),
      questionType: "text",
      question: "",
    };
    setForm((prev) => ({ ...prev, questions: [...prev.questions, question] }));
  };

  const handleQuestionChange = (question: Partial<QuestionItem>) => {
    const index = questions.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];
    newQuestions[index] = question as QuestionItem;
    setForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleDeleteQuestion = (id: string) => {
    const index = questions.findIndex((q) => q.id === id);
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      return;
    }
    const payload = {
      title,
      description,
      questions,
      user_id: user?.id,
    }
    if(form?.id){
      return supabase.from("forms").update(payload).eq("id", form.id);
    }
    return supabase.from("forms").insert(payload);
  };
  return (
    <div className="grid gap-4">
      <FormHeader
        value={{ title, description }}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, ...value }));
        }}
      />
      {questions.map((question) => (
        <FormQuestion
          key={question.id}
          onChange={handleQuestionChange}
          question={question}
          onDelete={() => handleDeleteQuestion(question.id)}
        />
      ))}
      <div>
        <Button onClick={handleAddQuestion} type="button">
          Add Question
        </Button>
        <Button onClick={handleSubmit} type="button">
          Save
        </Button>
      </div>
    </div>
  );
};

export type { QuestionItem };
export { DynamicForm };
