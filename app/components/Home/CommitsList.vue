<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GitHubRepo>())
const selectedRepoLoading = inject('selectedRepoLoading', shallowRef<boolean>(false))

const page = inject('commitsPage', shallowRef<number>(1))
const hasPreviousPage = inject('hasPreviousPage', shallowRef<boolean>(false))
const hasNextPage = inject('hasNextPage', shallowRef<boolean>(false))

/**
 * UI state variables
 */

/**
 * Data
 */
const { data: groupedCommitsData, refresh: refreshGroupedCommits } = await useFetch(
  () => `/api/github/commits?owner=${selectedRepo.value?.owner.login}&repo=${selectedRepo.value?.name}&page=${page.value}`,
  {
    immediate: false,
    key: 'current-commits',

    onRequest: () => {
      selectedRepoLoading.value = true
    }
  }
)

const groupedCommits = computed<CommitGroup[]>(() => groupedCommitsData.value?.groupedCommits ?? [])

/**
 * Watchers
 */
watch([selectedRepo, page], async ([newRepo, newPage]) => {
  if (!newRepo || newPage == 0) return

  else {
    await refreshGroupedCommits()

    hasPreviousPage.value = groupedCommitsData.value?.hasPreviousPage ?? false
    hasNextPage.value = groupedCommitsData.value?.hasNextPage ?? false

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
        v-for="skeleton in 2"
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

        <!-- <template #footer>
          <USkeleton class="h-4 w-full max-w-2/6" />
        </template> -->
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
