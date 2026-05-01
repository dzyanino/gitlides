import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { userId } = await getGithubToken(event)

  const supabase = await serverSupabaseClient(event)

  const { data: token, error: tokenError } = await supabase
    .from('provider_token')
    .select('*')
    .eq('user_id', userId)

  if (tokenError)
    throw createError({ statusCode: 500, message: tokenError.message })

  if (token.length > 0) {
    const { error: tokenDeletionError } = await supabase
      .from('provider_token')
      .delete()
      .eq('user_id', userId)

    if (tokenDeletionError)
      throw createError({ statusCode: 500, message: tokenDeletionError.message })

    return { success: true }
  }

  return { success: true }
})
