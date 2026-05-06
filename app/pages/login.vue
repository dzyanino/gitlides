<script setup lang="ts">
useSeoMeta({
  title: 'Login'
})

const toast = useToast()

const user = useSupabaseUser()

const supabase = useSupabaseClient()

const isLoginButtonLoading = shallowRef<boolean>(false)

const providers = [{
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    signIn()
  }
}]

async function signIn() {
  isLoginButtonLoading.value = true

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      scopes: 'public_repo',
      redirectTo: 'http://localhost:3000/confirm'
    }
  })

  if (error) {
    isLoginButtonLoading.value = false
    toast.add({ title: 'Error', description: 'Unknown login error', color: 'error' })
  }
}

watch(user, () => {
  if (user.value) {
    isLoginButtonLoading.value = true

    return navigateTo('/home')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex flex-1 items-center justify-center p-4">
    <UPageCard class="max-w-md -mt-(--ui-header-height)">
      <UAuthForm
        title="Login"
        description="Authenticate with your Github account to continue."
        icon="i-lucide-circle-user"
        :providers
        :loading="isLoginButtonLoading"
      >
        <template #providers>
          <template
            v-for="provider in providers"
            :key="provider.label"
          >
            <UButton
              :label="provider.label"
              :icon="provider.icon"
              :loading="isLoginButtonLoading"
              block
              color="neutral"
              variant="subtle"
              @click="signIn"
            />
          </template>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
