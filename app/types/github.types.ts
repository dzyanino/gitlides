type GithubRepo = {
  id: number
  name: string
  full_name: string

  private: boolean
  fork: boolean

  html_url: string

  description: string

  stargazers_count: number
  default_branch: string
  topics: string[]

  created_at: string
  updated_at: string
}

export type { GithubRepo }
