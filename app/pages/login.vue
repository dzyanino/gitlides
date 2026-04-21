<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
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
  <div class="flex flex-col flex-1 items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        title="Login"
        description="Authenticate with your Github account to continue."
        icon="i-lucide-user"
        :providers="providers"
      />
    </UPageCard>
  </div>
</template>
