<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GitHubRepo>())
const selectedRepoLoading = inject('selectedRepoLoading', shallowRef<boolean>(false))

const { data: groupedCommits, refresh: refreshGroupedCommits } = await useFetch(
  () => `/api/github/commits?owner=${selectedRepo.value?.owner.login}&repo=${selectedRepo.value?.name}`,
  {
    immediate: false,

    onRequest: () => {
      selectedRepoLoading.value = true
    },

    onResponse: () => {
      selectedRepoLoading.value = false
    }
  }
)

watch(selectedRepo, async (newRepo) => {
  if (newRepo)
    await refreshGroupedCommits()
})
</script>

<template>
  <!-- <div class="flex flex-col size-full items-start justify-start gap-2"> -->
  <UEmpty
    v-if="!selectedRepo"
    description=": ("
    variant="outline"
    class="flex-1 size-full"
  />
  <div
    v-else
    class="flex flex-col w-full gap-4"
  >
    <template
      v-for="group in groupedCommits"
      :key="group.date"
    >
      <HomeDatedCommits :group />
    </template>
  </div>
  <!-- </div> -->
</template>
