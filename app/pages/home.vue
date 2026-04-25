<script lang="ts" setup>
const toast = useToast()

const { data: savedRepos, refresh: refreshSavedRepos } = await useFetch('/api/github/saved-repo')

const { data: repos, pending: reposLoading, refresh: refreshRepos } = await useFetch('/api/github/repos', {
  immediate: false
})

const choosenRepos = ref<Tables<'repo'>[]>([])

const isAddReposModalOpen = shallowRef<boolean>(false)

async function getRepos() {
  isAddReposModalOpen.value = true
  if (!repos.value)
    await refreshRepos()
}

function emptyReposChoices() {
  choosenRepos.value = []
}

async function addRepos() {
  const { success } = await $fetch('/api/repo/add', {
    method: 'POST',
    body: {
      repos: choosenRepos.value
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
</script>

<template>
  <!-- @vue-ignore -->
  <UContainer
    v-if="savedRepos!.length <= 0"
    class="flex"
  >
    <UEmpty
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
          v-model="choosenRepos"

          :items="repos"
          :loading="reposLoading"

          :filter="{
            placeholder: 'Search...',
            icon: 'i-lucide-search'
          }"
          label-key="full_name"

          multiple
          selected-icon="i-lucide-circle-check"
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
          :disabled="repos.length <= 0"
          @click="addRepos"
        />
      </template>
    </UModal>
  </UContainer>

  <UContainer v-else>
    <div class="flex flex-col md:flex-row gap-4 w-full h-[calc(100vh-var(--ui-header-height))] justify-evenly py-4">
      <div class="flex flex-col flex-1/3 max-h-full overflow-auto wrap-break-word justify-start bg-primary/10">
        <HomeReposList />
      </div>

      <div class="flex flex-col flex-2/3 max-h-full overflow-auto wrap-break-word justify-start bg-primary/10">
        <HomeCommitsList />
      </div>
    </div>
  </UContainer>
</template>
