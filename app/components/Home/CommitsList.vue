<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GitHubRepo>())
const selectedRepoLoading = inject('selectedRepoLoading', shallowRef<boolean>(false))

const { data: groupedCommits, refresh: refreshGroupedCommits } = await useFetch(
  () => `/api/github/commits?owner=${selectedRepo.value?.owner.login}&repo=${selectedRepo.value?.name}`,
  {
    immediate: false,
    key: 'current-commits',

    onRequest: () => {
      selectedRepoLoading.value = true
    }
  }
)

watch(selectedRepo, async (newRepo) => {
  if (!newRepo) return

  else {
    await refreshGroupedCommits()
    selectedRepoLoading.value = false
  }
})
</script>

<template>
  <UEmpty
    v-if="!selectedRepo"
    description=": ("
    variant="outline"
    class="size-full"
  />
  <div
    v-else
    class="flex flex-col w-full gap-4 p-px"
  >
    <template v-if="selectedRepoLoading">
      <UCard
        v-for="skeleton in 4"
        :key="skeleton"
      >
        <template #title>
          <USkeleton class="h-4 w-full max-w-3/6" />
        </template>

        <div class="flex flex-col gap-4">
          <USkeleton class="h-4 w-full max-w-4/6" />
          <USkeleton class="h-4 w-full max-w-5/6" />
          <USkeleton class="h-4 w-full max-w-3/6" />
          <USkeleton class="h-4 w-full max-w-4/6" />
        </div>

        <template #footer>
          <USkeleton class="h-4 w-full max-w-2/6" />
        </template>
      </UCard>
    </template>

    <template v-else>
      <template
        v-for="group in groupedCommits"
        :key="group.date"
      >
        <HomeDatedCommits :group />
      </template>
    </template>
  </div>
</template>
