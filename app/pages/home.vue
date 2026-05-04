<script lang="ts" setup>
useSeoMeta({
  title: 'Home'
})

const viewport = useViewport()

const toast = useToast()

const { data: savedRepos, refresh: refreshSavedRepos } = await useFetch('/api/github/saved-repo')

const { data: repos, pending: reposLoading, refresh: refreshRepos } = await useFetch('/api/github/repos', {
  immediate: false,
  key: 'repos'
})

const selectedRepos = ref<Tables<'repo'>[]>([])

const isAddReposModalOpen = shallowRef<boolean>(false)

async function getRepos() {
  isAddReposModalOpen.value = true

  const { data } = useNuxtData('repos')

  if (!data.value)
    await refreshRepos()
  else
    repos.value = data.value
}

function emptyReposChoices() {
  selectedRepos.value = []
}

async function addRepos() {
  const { success } = await $fetch('/api/repo/add', {
    method: 'POST',
    body: {
      repos: selectedRepos.value
    }
  })

  if (success) {
    emptyReposChoices()

    isAddReposModalOpen.value = false

    await refreshSavedRepos()
  } else {
    toast.add({ title: 'Error', description: 'Something went wrong. Refresh the page', color: 'error' })
  }
}

/**
 * Children props
 */
const selectedRepo = shallowRef<GitHubRepo>()
const selectedRepoLoading = shallowRef<boolean>(false)

provide('selectedRepo', selectedRepo)
provide('selectedRepoLoading', selectedRepoLoading)
</script>

<template>
  <div class="flex-1">
    <UContainer class="flex size-full">
      <!-- @vue-ignore -->
      <UEmpty
        v-if="savedRepos!.length <= 0"
        icon="i-lucide-folder-git"
        title="No repositories found"
        description="It looks like you haven't added any repositories. Add one to get started."
        :actions="[
          {
            icon: 'i-lucide-plus',
            label: 'Add repo',
            onClick: getRepos
          }
        ]"
        class="max-w-md mx-auto self-center -mt-(--ui-header-height)"
      />

      <div
        v-else
        class="flex flex-col md:flex-row w-full h-[calc(100vh-var(--ui-header-height))] py-4"
      >
        <div class="flex flex-col w-full md:max-w-4/11 h-full max-h-fit md:max-h-full gap-2 p-2">
          <HomeRepoDetails />

          <HomeRepoSelect v-show="viewport.isLessThan('tablet')" />

          <HomeReposList v-show="viewport.isGreaterOrEquals('tablet')" />
        </div>

        <div class="flex flex-col w-full h-full max-h-full overflow-auto wrap-break-word gap-2 p-2">
          <HomeCommitsList />
        </div>
      </div>
    </UContainer>

    <UModal
      v-model:open="isAddReposModalOpen"
      title="Repositories"
      description="Choose which ones you want to add"

      modal
      :dismissible="false"

      :close="{ onClick: () => emptyReposChoices() }"

      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <!-- @vue-ignore -->
        <UListbox
          v-model="selectedRepos"

          :items="repos"
          :loading="reposLoading"

          :filter="{
            placeholder: 'Search...',
            icon: 'i-lucide-search'
          }"
          label-key="full_name"

          multiple
        >
          <template #item-label="{ item }">
            <span>{{ item.full_name }}</span>
          </template>

          <template #item-description="{ item }">
            <div class="flex gap-1 items-center justify-start">
              <UIcon name="i-lucide-star" />
              <span>{{ item.stargazers_count }}</span>
            </div>
          </template>
        </UListbox>
      </template>

      <template
        v-if="repos"
        #footer
      >
        <UButton
          label="Confirm"
          icon="i-lucide-check"
          :disabled="selectedRepos.length <= 0"
          @click="addRepos"
        />
      </template>
    </UModal>
  </div>
</template>
