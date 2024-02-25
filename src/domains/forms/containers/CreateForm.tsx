"use client";
import { useState } from "react";
import { FormHeader } from "../components/FormHeader";
import FormQuestion from "../components/FormQuestion";
import { Button } from "@/components/ui/button";
import { QuestionType } from "../components/FormQuestionType";
import { MultipleOptions } from "../components/FormRadioGroup";
import { v4 as uuidv4 } from "uuid";

// type Question = {

// }

type QuestionItem = {
  id: string;
  questionType: QuestionType;
  question: string;
  text ?: string;
  options?: MultipleOptions;
};

const CreateForm = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [form, setForm] = useState({
    title: "Untitled Form",
    description: "Form Description",
  });

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: uuidv4(), questionType: "text", question: "" },
    ]);
  };

  const handleQuestionChange = (question: Partial<QuestionItem>) => {
    const index = questions.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];
    newQuestions[index] = question as QuestionItem;
    setQuestions(newQuestions);
  };

  return (
    <div className="grid gap-4">
      <FormHeader
        value={{ title: "Untitled Form", description: "Form Description" }}
        onChange={() => {}}
      />
      {questions.map((question) => (
        <FormQuestion
          key={question.id}
          onChange={handleQuestionChange}
          question={question}
        />
      ))}

      <Button onClick={handleAddQuestion} type="button">
        Add Question
      </Button>
    </div>
  );
};

export type { QuestionItem };
export { CreateForm };
