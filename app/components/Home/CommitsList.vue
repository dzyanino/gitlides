<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GithubRepo>())
const selectedRepoLoading = inject('selectedRepoLoading', shallowRef<boolean>(false))

const { data: commits, pending: commitsLoading, refresh: refreshCommits } = await useFetch(
  `/api/github/commits?owner=${selectedRepo.value?.owner.login}&repo=${selectedRepo.value?.name}`,
  { immediate: false }
)

watch(selectedRepo, async () => {
  selectedRepoLoading.value = true

  if (selectedRepo) {
    await refreshCommits()
    selectedRepoLoading.value = commitsLoading.value
  }
})
</script>

<template>
  <div class="flex flex-col size-full max-h-full items-start justify-start gap-2">
    <UEmpty
      v-if="!selectedRepo"
      description=": ("
      variant="outline"
      class="flex-1 size-full"
    />
    <div
      v-else
      class="flex flex-col gap-2 size-full"
    >
      <template
        v-for="commit in commits"
        :key="commit.sha"
      >
        <UAlert
          :title="commit.commit.message"
          :description="commit.sha"
          color="neutral"
          variant="soft"
          class="min-h-20"
        />
      </template>
    </div>
  </div>
</template>
