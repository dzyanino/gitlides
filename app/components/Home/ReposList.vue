<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GithubRepo>())
const selectedRepoLoading = inject('selectedRepoLoading', shallowRef<boolean>(false))

const { data: repos, pending: reposLoading } = await useFetch('/api/github/saved-repo')
</script>

<template>
  <div class="flex flex-col size-full items-start justify-start">
    <!-- @vue-ignore -->
    <UListbox
      v-model="selectedRepo"

      :items="repos"
      :loading="reposLoading"
      :disabled="selectedRepoLoading"

      :filter="{ icon: 'i-lucide-search' }"

      label-key="full_name"
      class="size-full"
    >
      <template #item-label="{ item }">
        <span>{{ item.full_name }}</span>
      </template>

      <template #item-description="{ item }">
        <span>{{ item.description }}</span>
      </template>
    </UListbox>
  </div>
</template>
