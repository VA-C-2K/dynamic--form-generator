import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FormQuestionType } from "./FormQuestionType";

type FormQuestionProps = {};
const FormQuestion = () => {
    const [questionType, setQuestionType] = useState<"text" | "multiple-choice" | "checkbox">("text");
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>
          <Input type="text" placeholder="Question" name="question" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 items-start">
        <div>
          <h1> question options </h1>
        </div>
        <FormQuestionType
          value="text"
          onChange={(value) => console.log(value)}
        />
      </CardContent>
    </Card>
  );
};

export default FormQuestion;
