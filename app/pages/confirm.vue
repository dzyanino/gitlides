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
    <UMain class="flex">
      <UContainer class="flex items-center justify-center">
        <span>Redirecting...</span>
      </UContainer>
    </UMain>
  </UApp>
</template>
