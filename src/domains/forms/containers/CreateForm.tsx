"use client";
import { useState } from "react";
import { FormHeader } from "../components/FormHeader";
import FormQuestion from "../components/FormQuestion";

const CreateForm = () => {
  const [form, setForm] = useState({
    title: "Untitled Form",
    description: "Form Description",
  });
  return (
    <div className="grid gap-4">
      <FormHeader
        value={{ title: "Untitled Form", description: "Form Description" }}
        onChange={() => {}}
      />
      <FormQuestion />
      <FormQuestion />
      <FormQuestion />
    </div>
  );
};

export { CreateForm };
