import type { H3Event } from '#imports'
import { serverSupabaseUser } from '#supabase/server'

export async function requireAuth(event: H3Event<globalThis.EventHandlerRequest>) {
  const user = await serverSupabaseUser(event)

  if (!user || !user.user_metadata)
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  return user
}
