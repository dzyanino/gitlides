import { Octokit, RequestError } from 'octokit'

export default defineEventHandler(async (event) => {
  const { token: auth } = await getGithubToken(event)

  try {
    const octokit = new Octokit({ auth })

    const { data } = await octokit.rest.repos.listForAuthenticatedUser()

    return data
  } catch (error) {
    if (error instanceof RequestError)
      throw createError({ status: 500, message: 'Error fetching repos' })
  }
})
