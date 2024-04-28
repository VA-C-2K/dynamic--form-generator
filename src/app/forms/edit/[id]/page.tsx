import { DynamicFormFeilds } from "@/domains/forms/containers/DynamicFormFeilds";
import { fetchById } from "@/server/database/forms";
import { DynamicForm, } from "@/server/types/DynamicForm";
type PageProps = {
  params: { id: string };
  searchParams: {};
};
const page = async ({ params }: PageProps) => {
  const { id } = params;
  const form = await fetchById<DynamicForm>(id);
  return <DynamicFormFeilds form={form} />;
};

export default page;
