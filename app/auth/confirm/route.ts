import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType
  const next = searchParams.get('next') ?? '/'

  if (!token_hash || !type) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.verifyOtp({ token_hash, type })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    })
  }

  // Redirect user upon successful verification
  return redirect('/')
}