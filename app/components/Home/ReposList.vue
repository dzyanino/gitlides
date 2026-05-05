<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GitHubRepo>())
const selectedRepoLoading = inject('selectedRepoLoading', shallowRef<boolean>(false))
const commitsPage = inject('commitsPage', shallowRef<number>(1))

const { data: repos, pending: reposLoading } = await useFetch('/api/github/saved-repo')
</script>

<template>
  <div class="flex flex-col w-full h-2/3 items-start justify-center">
    <!-- @vue-ignore -->
    <UListbox
      v-model="selectedRepo"

      :items="repos"
      :loading="reposLoading"
      :disabled="selectedRepoLoading"

      :filter="{ icon: 'i-lucide-search' }"

      label-key="full_name"
      class="size-full"
      @change="commitsPage = 1"
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
