import { Octokit, RequestError } from 'octokit'

export default defineEventHandler(async (event) => {
  const { token: auth } = await getGithubToken(event)

  const query = getQuery(event)

  const { owner, repo } = query

  if (!owner || !repo)
    throw createError({ statusCode: 400, message: 'Missing query parameters' })

  try {
    const octokit = new Octokit({ auth })

    const { data } = await octokit.rest.repos.listCommits({
      owner: owner.toString(),
      repo: repo.toString()
    })

    return data
  } catch (error) {
    if (error instanceof RequestError)
      throw createError({ status: 500, message: 'Error fetching repos' })
  }
})
