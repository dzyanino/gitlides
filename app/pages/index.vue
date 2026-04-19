<script setup lang="ts">
</script>

<template>
  <UPageHero
    title="No more boring meetings"
    description="Gitlides is a tool for making slides out of daily commits to use during review meetings."
    class="w-full h-full"
  >
    <template #links>
      <UButton
        to="/login"
        icon="i-lucide-arrow-right"
        label="Get started"
        size="lg"
        external
      />

      <UButton
        to="#"
        label="Learn more"
        color="neutral"
        variant="subtle"
        size="lg"
      />
    </template>
  </UPageHero>
</template>
