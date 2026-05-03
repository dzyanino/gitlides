<script setup lang="ts">
const user = useSupabaseUser()
const isButtonLoading = shallowRef<boolean>(false)
</script>

<template>
  <div class="flex-1">
    <Teleport to="body">
      <IndexBackground
        direction="left"
        :speed="0.1"
        :square-size="40"
        hover-fill-color="#27ff64"

        class="fixed inset-0 -z-10"
      />
    </Teleport>

    <UPageHero
      description="Gitlides is a tool for making slides out of daily commits to use during review meetings."
      class="w-full h-full"
    >
      <template #title>
        <span class="main-title">No more <span class="title-emphasis text-dimmed">boring</span> meetings</span>
      </template>

      <template #links>
        <UButton
          v-if="!user"
          to="/login"
          icon="i-lucide-arrow-right"
          label="Get started"
          size="lg"
        />

        <UButton
          v-else
          to="/home"
          icon="i-lucide-git-graph"
          label="Continue"
          size="lg"
          :loading="isButtonLoading"
          @click="isButtonLoading = true"
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
  </div>
</template>

<style scoped>
.main-title {
  font-family: 'Arima', serif;
}

.title-emphasis {
  font-family: 'Rock 3D', sans-serif;
}
</style>
