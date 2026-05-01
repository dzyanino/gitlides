<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GithubRepo>())

const { data: repos, pending: reposLoading } = await useFetch('/api/github/saved-repo')
</script>

<template>
  <div class="flex flex-col w-full h-full md:h-4/6 md:max-h-4/6 items-start justify-start">
    <!-- @vue-ignore -->
    <UListbox
      v-model="selectedRepo"

      :items="repos"
      :loading="reposLoading"

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
