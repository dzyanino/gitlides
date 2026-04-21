<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) console.error(error)
}
</script>

<template>
  <UApp>
    <UHeader
      title="Gitlides"
      class="border-none"
    >
      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/dzyanino/gitlides"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />

        <UButton
          v-if="user"
          icon="i-lucide-log-out"
          :label="user.email"
          color="neutral"
          variant="subtle"
          size="lg"
          @click="signOut"
        />
      </template>
    </UHeader>

    <UMain class="flex">
      <slot />
    </UMain>
  </UApp>
</template>
