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
  <div class="flex flex-col size-full max-h-full items-start justify-start gap-2">
    <UEmpty
      v-if="!selectedRepo"
      description=": ("
      variant="outline"
      class="flex-1 size-full"
    />
    <div
      v-else
      class="flex flex-col size-full"
    >
      <template
        v-for="group in groupedCommits"
        :key="group.date"
      >
        <UCard
          :title="group.date"
        >
          <template
            v-for="commit in group.commits"
            :key="commit.sha"
          >
            <span>{{ commit.message }}</span>
            <span>{{ commit.sha }}</span>
            <span>{{ commit.author }}</span>
            <span>{{ commit.html_url }}</span>
            <span>{{ commit.sha }}</span>
          </template>
        </UCard>
      </template>
    </div>
  </div>
</template>
