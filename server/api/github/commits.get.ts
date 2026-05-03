import { Octokit, RequestError } from 'octokit'

function transformAndGroupCommits(commits: GitHubCommit[]): CommitGroup[] {
  const simplified: TransformedCommit[] = commits.map(commit => ({
    sha: commit.sha,
    html_url: commit.html_url,
    message: commit.commit.message,
    author: {
      name: commit.commit.author.name,
      email: commit.commit.author.email,
      login: commit.author?.login,
      avatar_url: commit.author?.avatar_url
    },
    date: commit.commit.author.date,
    verified: commit.commit.verification.verified
  }))

  const grouped = simplified.reduce<Record<string, TransformedCommit[]>>((acc, commit) => {
    const day = commit.date.split('T')[0]

    if (day) {
      if (!acc[day]) acc[day] = []

      acc[day].push(commit)
    }

    return acc
  }, {})

  return Object.entries(grouped)
    .map(([date, commits]): CommitGroup => ({ date, commits }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default defineEventHandler(async (event) => {
  const { token: auth } = await getGithubToken(event)

  const query = getQuery(event)

  const { owner, repo } = query

  if (!owner || !repo)
    throw createError({ statusCode: 400, message: 'Missing query parameters' })

  try {
    const octokit = new Octokit({ auth })

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: owner.toString(),
      repo: repo.toString(),
      headers: {
        'X-GitHub-Api-Version': '2026-03-10'
      }
    })

    return transformAndGroupCommits(data as GitHubCommit[])
  } catch (error) {
    if (error instanceof RequestError) {
      throw createError({ status: 500, message: 'Error fetching repos' })
    }
  }
})
