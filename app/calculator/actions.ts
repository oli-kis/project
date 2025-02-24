'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

export async function isUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
  
    return !!data?.user && !error;
  }

  export async function redirectToLogin() {
    redirect('/login');
  }