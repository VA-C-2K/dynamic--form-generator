import { DynamicForm } from "../../types/DynamicForm";
import { supabase } from "../../utils/supabase";
import { FormResponse } from "@/server/types/FormResponse";

const create = async (payload:DynamicForm) : Promise<FormResponse> => {
    const { client, user } = await supabase();
    const { error, data } = await client.from('forms').insert<DynamicForm>({
        ...payload,
        user_id: user?.id 
    });
    if (error) {
        throw error;
    }
    return data;
}

export { create };