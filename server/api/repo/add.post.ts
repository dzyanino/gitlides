import { serverSupabaseClient } from '#supabase/server'
import type { Tables } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const { userId } = await requireAuth(event)

  const body = await readBody(event)
  const { repos } = body

  if (!repos)
    throw createError({ statusCode: 400, message: 'Missing body' })

  const supabase = await serverSupabaseClient(event)

  repos.forEach(async (repo: Tables<'repo'>) => {
    const { error } = await supabase
      .from('repo')
      .upsert({
        full_name: repo.full_name,
        user_id: userId
      }, { onConflict: 'full_name' })

    if (error)
      throw createError({ statusCode: 500, message: error.message })
  })

  return { success: true }
})
