import type { H3Event } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

export async function getGithubToken(event: H3Event<globalThis.EventHandlerRequest>) {
  const { userId } = await requireAuth(event)

  const supabase = await serverSupabaseClient(event)

  const { data: tokenData, error: tokenError } = await supabase
    .from('provider_token')
    .select('token')
    .eq('user_id', userId)

  if (tokenError)
    throw createError({ statusCode: 500, message: tokenError.message })

  if (!tokenData[0] || !tokenData[0].token)
    throw createError({ statusCode: 404, message: 'No token found' })

  return { userId, token: tokenData[0].token }
}
