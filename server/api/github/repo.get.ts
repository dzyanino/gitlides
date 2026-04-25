import { serverSupabaseClient } from '#supabase/server'
import { Octokit } from 'octokit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const supabase = await serverSupabaseClient(event)

  const token = await supabase
    .from('provider_token')
    .select('token')
    .eq('user_id', user.user_metadata!.provider_id) // yeah i know `!` is shit but fuck it

  const octokit = new Octokit({ auth: token })

  const { data } = await octokit.rest.repos.listForAuthenticatedUser()

  return data
})
