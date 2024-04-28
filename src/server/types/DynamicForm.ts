type Option = {
    id: string;
    label: string;
    isChecked?: boolean;
  };
  
type MultipleOptions = Option[];
type QuestionType = "text" | "multiple-choice" | "checkbox";
type QuestionItem = {
    id: string;
    questionType: QuestionType;
    question: string;
    text?: string;
    options?: MultipleOptions;
  };
type DynamicForm = {
    id?: string;
    title: string;
    description: string;
    questions: QuestionItem[];
    user_id?: string;
  };

export type { DynamicForm, QuestionItem, QuestionType, Option, MultipleOptions };
