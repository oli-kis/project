import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser();

    return data?.user ?? null;
}