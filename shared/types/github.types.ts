interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
  site_admin: boolean
}

interface GitHubLicense {
  key: string
  name: string
  spdx_id: string
  url: string | null
}

interface GitHubCommitAuthor {
  name: string
  email: string
  date: string
}

interface GitHubCommitVerification {
  verified: boolean
  reason: string
  signature: string | null
  payload: string | null
}

interface GitHubCommitDetail {
  message: string
  author: GitHubCommitAuthor
  committer: GitHubCommitAuthor
  comment_count: number
  verification: GitHubCommitVerification
}

interface GitHubCommit {
  sha: string
  html_url: string
  commit: GitHubCommitDetail
  author: GitHubUser | null
  committer: GitHubUser | null
  parents: { sha: string, url: string }[]
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
  fork: boolean
  owner: GitHubUser
  default_branch: string
  visibility: 'public' | 'private' | 'internal'
  language: string | null
  topics: string[]
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  archived: boolean
  disabled: boolean
  license: GitHubLicense | null
  created_at: string
  updated_at: string
  pushed_at: string
  permissions?: {
    admin: boolean
    push: boolean
    pull: boolean
  }
}

interface TransformedCommit {
  sha: string
  html_url: string
  message: string
  author: {
    name: string
    email: string
    login: string | undefined
    avatar_url: string | undefined
  }
  date: string
  verified: boolean
}

interface CommitGroup {
  date: string
  commits: TransformedCommit[]
}

export type {
  GitHubCommit,
  GitHubCommitAuthor,
  GitHubCommitDetail,
  GitHubCommitVerification,
  GitHubLicense,
  GitHubRepo,
  GitHubUser,
  TransformedCommit,
  CommitGroup
}
