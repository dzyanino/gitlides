<script lang="ts" setup>
// import { Octokit } from 'octokit'

// const session = useSupabaseSession()
// const user = useSupabaseUser()
// const octokit = new Octokit({ auth: session.value?.access_token })
</script>

<template>
  <UEmpty
    v-if="false"
    icon="i-lucide-folder-git"
    title="No repositories found"
    description="It looks like you haven't added any repositories. Add one to get started."
    :actions="[
      {
        icon: 'i-lucide-plus',
        label: 'Add repo'
      }
    ]"
    class="max-w-md mx-auto self-center -mt-(--ui-header-height)"
  />

  <UContainer v-else>
    <div class="flex flex-col md:flex-row gap-4 w-full h-[calc(100vh-var(--ui-header-height))] justify-evenly py-4">
      <div class="flex flex-col flex-1/3 max-h-full overflow-auto wrap-break-word justify-start bg-primary/10">
        <span>LEFT</span>
      </div>

      <div class="flex flex-col flex-2/3 max-h-full overflow-auto wrap-break-word justify-start bg-primary/10">
        <!-- <HomeCommitsList /> -->
        <!-- <span>{{ session }}</span> -->
        <HomeReposList />
      </div>
    </div>
  </UContainer>
</template>
