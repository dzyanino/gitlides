import { Octokit, RequestError } from 'octokit'

export default defineEventHandler(async (event) => {
  const { token: auth } = await getGithubToken(event)

  try {
    const octokit = new Octokit({ auth })

    const { data } = await octokit.request('GET /user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2026-03-10'
      }
    })
    return data as GitHubRepo[]
  } catch (error) {
    if (error instanceof RequestError)
      throw createError({ status: 500, message: 'Error fetching repos' })
  }
})
