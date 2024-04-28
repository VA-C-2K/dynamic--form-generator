import { DynamicForm } from "../../types/DynamicForm";
import { supabase } from "../../utils/supabase";
import { FormResponse } from "@/server/types/FormResponse";

type Update = {
    id: DynamicForm["id"],
    payload: DynamicForm
}
const update = async ({id, payload}:Update) : Promise<FormResponse> => {
    const { client, user } = await supabase();
    const { error, data } = await client.from('forms').update<DynamicForm>({
        ...payload,
        user_id: user?.id 
    })
    .eq("id",id);
    if (error) {
        throw error;
    }
    return data;
}
export type { Update };
export { update };