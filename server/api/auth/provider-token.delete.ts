import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { user_id } = getQuery(event)

  if (!user_id)
    throw createError({ statusCode: 400, message: 'Missing query parameter' })

  if (typeof parseInt(user_id.toString()) != 'number')
    throw createError({ statusCode: 400, message: 'Invalid query parameter' })

  const supabase = await serverSupabaseClient(event)

  const { error } = await supabase
    .from('provider_token')
    .delete()
    .eq('user_id', parseInt(user_id.toString()))

  if (error)
    throw createError({ statusCode: 500, message: error.message })

  return { success: true }
})
