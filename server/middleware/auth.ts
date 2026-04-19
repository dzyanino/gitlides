export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  if (!session.user.token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
})
