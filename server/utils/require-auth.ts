import type { H3Event } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

export async function requireAuth(event: H3Event<globalThis.EventHandlerRequest>) {
  const user = await serverSupabaseUser(event)

  if (!user || !user.user_metadata)
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  return { user, userMetadata: user.user_metadata, userId: user.user_metadata.provider_id as number }
}
