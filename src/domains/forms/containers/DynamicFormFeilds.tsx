"use client";
import { useMemo, useState } from "react";
import { FormHeader } from "../components/FormHeader";
import FormQuestion from "../components/FormQuestion";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { QuestionItem } from "@/server/types/DynamicForm";
import { useDynamicForm } from "../hooks/useDynamicForm";

type Form = {
  id?: string;
  title: string;
  description: string;
  questions: QuestionItem[];
};
type DynamicFormProps = {
  form?: Form;
};
const DynamicFormFeilds = ({ form }: DynamicFormProps) => {
  const { handleOnSubmit } = useDynamicForm();
  const [{ title, description, questions }, setForm] = useState<Form>(
    form ?? {
      title: "",
      description: "",
      questions: [],
    }
  );

  const payload = useMemo(() => ({
    ...form,
    title,
    description,
    questions,
  }),[description, form, questions, title]);

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
        <Button onClick={() => handleOnSubmit(payload)} type="button">
          Save
        </Button>
      </div>
    </div>
  );
};

export { DynamicFormFeilds };
