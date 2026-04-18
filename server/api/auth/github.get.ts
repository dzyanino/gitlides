export default defineOAuthGitHubEventHandler({
  config: {
    scope: ['public_repo']
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })
    return sendRedirect(event, '/home')
  }
})
