<script setup lang="ts">
definePageMeta({
  layout: false
})

const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/home')
  }
}, { immediate: true })
</script>

<template>
  <UApp>
    <UMain class="flex flex-col flex-1">
      <div class="flex flex-1 items-center justify-center p-4">
        <span>Waiting for login...</span>
      </div>
    </UMain>
  </UApp>
</template>
