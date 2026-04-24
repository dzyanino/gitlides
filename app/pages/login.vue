<script setup lang="ts">
const toast = useToast()

const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    toast.add({
      title: 'Connexion réussie',
      ...(
        (user.value.user_metadata && user.value.user_metadata.avatar_url)
          ? { avatar: user.value.user_metadata.avatar_url }
          : { icon: 'i-lucide-circle-check' }
      )
    })

    return navigateTo('/home')
  }
}, { immediate: true })

const supabase = useSupabaseClient()

const providers = [{
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  class: 'cursor-pointer',
  onClick: () => {
    signIn()
  }
}]

supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session && session.provider_token) {
    const success = await $fetch('/api/auth/provider-token', {
      method: 'POST',
      body: {
        user_id: session.user.user_metadata.provider_id,
        provider_token: session.provider_token
      }
    })

    console.log(success)

    if (!success) toast.add({ title: 'Error', description: 'Unknown error', color: 'error' })
  }
})

async function signIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      scopes: 'public_repo',
      redirectTo: 'http://localhost:3000/confirm'
    }
  })

  if (error) console.error(error)
}
</script>

<template>
  <UContainer class="flex items-center justify-center">
    <UPageCard class="max-w-md -mt-(--ui-header-height)">
      <UAuthForm
        title="Login"
        description="Authenticate with your Github account to continue."
        icon="i-lucide-user"
        :providers="providers"
      />
    </UPageCard>
  </UContainer>
</template>
