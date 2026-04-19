export default defineOAuthGitHubEventHandler({
  config: {
    scope: ['public_repo']
  },

  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        login: user.login,
        id: user.id,
        avatar_url: user.avatar_url,
        gravatar_id: user.gravatar_id,
        url: user.url,
        repos_url: user.repos_url,
        name: user.name,
        public_repos: user.public_repos,
        token: tokens.access_token
      }
    })

    return sendRedirect(event, '/home')
  },

  onError(event, error) {
    console.error('Github OAuth error: ', error)
    return sendRedirect(event, '/')
  }
})
