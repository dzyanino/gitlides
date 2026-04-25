import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  const body = await readBody(event)
  const { id, username } = body

  if (!id || !username)
    throw createError({ statusCode: 400, message: 'Missing body' })

  const supabase = await serverSupabaseClient(event)

  const { error } = await supabase
    .from('user')
    .upsert({
      id,
      username
    }, { onConflict: 'id' })

  if (error)
    throw createError({ statusCode: 500, message: error.message })

  return { success: true }
})
