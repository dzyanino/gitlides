<script lang="ts" setup>
</script>

<template>
  <UEmpty
    v-if="false"
    icon="i-lucide-folder-git"
    title="No repositories found"
    description="It looks like you haven't added any repositories. Add one to get started."
    :actions="[
      {
        icon: 'i-lucide-plus',
        label: 'Add repo'
      }
    ]"
    class="max-w-md mx-auto self-center -mt-(--ui-header-height)"
  />

  <UContainer
    v-else
    class="py-4"
  >
    <div class="flex flex-col md:flex-row gap-4 size-full justify-evenly">
      <div class="flex flex-col flex-1/3 justify-start bg-primary/50">
        <span>LEFT</span>
      </div>

      <div class="flex flex-col flex-2/3 justify-start bg-primary/50">
        <HomeCommitsList />
      </div>
    </div>
  </UContainer>
</template>
