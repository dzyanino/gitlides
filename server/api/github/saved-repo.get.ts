import { serverSupabaseClient } from '#supabase/server'
import { Octokit, RequestError } from 'octokit'

export default defineEventHandler(async (event) => {
  const { userId, token: auth } = await getGithubToken(event)

  const supabase = await serverSupabaseClient(event)

  const { data: databaseRepos, error: databaseReposError } = await supabase
    .from('repo')
    .select()
    .eq('user_id', userId)

  if (databaseReposError)
    throw createError({ statusCode: 500, message: databaseReposError.message })

  try {
    const octokit = new Octokit({ auth })

    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser()

    const databaseRepoNames = new Set(databaseRepos.map(r => r.name))
    const savedRepos = repos.filter(repo => databaseRepoNames.has(repo.name))

    return savedRepos
  } catch (error) {
    if (error instanceof RequestError)
      throw createError({ status: 500, message: 'Error fetching saved repos' })
  }
})
