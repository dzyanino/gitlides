<script setup lang="ts">
definePageMeta({
  layout: false
})

const toast = useToast()

const session = useSupabaseSession()
const user = useSupabaseUser()

const hasProcessed = shallowRef<boolean>(false)

watch([session, user], async () => {
  if (hasProcessed.value) return

  if (
    session.value
    && session.value.provider_token
    && user.value
    && user.value.user_metadata
  ) {
    hasProcessed.value = true

    try {
      const { success: userAdded } = await $fetch('/api/user/add', {
        method: 'POST',
        body: {
          id: user.value.user_metadata.provider_id,
          username: user.value.user_metadata.user_name
        }
      })

      const { success: tokenAdded } = await $fetch('/api/auth/provider-token', {
        method: 'POST',
        body: {
          user_id: user.value.user_metadata.provider_id,
          provider_token: session.value.provider_token
        }
      })

      if (!userAdded || !tokenAdded) {
        throw new Error('Failed to sync user data')
      }

      toast.add({
        title: user.value.user_metadata.avatar_url
          ? `Connected as ${user.value.user_metadata.user_name}`
          : 'Connected',
        icon: 'i-lucide-circle-check'
      })

      await navigateTo('/home')
    } catch (error) {
      if (error instanceof Error) {
        hasProcessed.value = false
        toast.add({
          title: 'Error',
          description: error.message || 'Unknown error',
          color: 'error'
        })
      }
    }
  }
}, { immediate: true })
</script>

<template>
  <UApp>
    <UMain class="flex">
      <UContainer class="flex items-center justify-center">
        <span>Redirecting...</span>
      </UContainer>
    </UMain>
  </UApp>
</template>
