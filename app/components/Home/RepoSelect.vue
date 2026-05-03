<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GitHubRepo>())
const selectedRepoLoading = inject('selectedRepoLoading', shallowRef<boolean>(false))

const { data: repos, pending: reposLoading } = await useFetch('/api/github/saved-repo')
</script>

<template>
  <div class="flex flex-col w-full items-center justify-center">
    <!-- @vue-ignore -->
    <USelectMenu
      v-model="selectedRepo"
      :items="repos"
      :loading="reposLoading"
      :disabled="selectedRepoLoading"
      clear

      :search-input="{ icon: 'i-lucide-search' }"

      label-key="full_name"
      class="w-full"
    />
  </div>
</template>
