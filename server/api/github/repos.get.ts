import { serverSupabaseClient } from '#supabase/server'
import { Octokit, RequestError } from 'octokit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const supabase = await serverSupabaseClient(event)

  // take user's github token first
  const { data: tokenData, error: tokenError } = await supabase
    .from('provider_token')
    .select('token')
    .eq('user_id', user.user_metadata!.provider_id) // yeah i know `!` is shit but fuck it

  if (tokenError)
    throw createError({ statusCode: 500, message: tokenError.message })

  if (!tokenData[0] || !tokenData[0].token)
    throw createError({ statusCode: 404, message: 'No token found' })

  // then request github's api with token
  try {
    const octokit = new Octokit({ auth: tokenData[0].token })

    const { data } = await octokit.rest.repos.listForAuthenticatedUser()

    return data
  } catch (error) {
    if (error instanceof RequestError)
      throw createError({ status: 500, message: 'Error fetching repos' })
  }
})
