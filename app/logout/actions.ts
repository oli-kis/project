'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = async () => {
  try {
    const { auth } = createClient()

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "Something went wrong" };
  }
};

export const redirectToHome = () => {
  revalidatePath("/", "layout");
  redirect("/");
}