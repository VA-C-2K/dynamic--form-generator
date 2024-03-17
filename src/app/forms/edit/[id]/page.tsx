import { DynamicForm } from "@/domains/forms/containers/DynamicForm";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
type PageProps = {
  params: { id: string };
  searchParams: {};
};
const page = async ({ params }: PageProps) => {
  const { id } = params;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data: form } = await supabase.from("forms").select("*").eq("id", id).single();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <DynamicForm session={session} form={form} />;
};

export default page;
