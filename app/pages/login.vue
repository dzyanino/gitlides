<script setup lang="ts">
</script>

<template>
  <UPageHero
    title="No more boring meetings"
    description="Gitlides is a tool for making slides out of daily commits to use during review meetings."
    class="w-full h-full"
  >
    <!-- <template #links>
      <UButton
        v-if="!loggedIn"
        to="/api/auth/github"
        icon="i-simple-icons-github"
        label="Login with GitHub"
        color="neutral"
        size="lg"
        external
      />

      <template v-else>
        <UButton
          to="/home"
          icon="i-lucide-git-graph"
          label="Continue"
          color="neutral"
          size="lg"
        />
        <UButton
          icon="i-lucide-log-out"
          label="Logout"
          color="neutral"
          variant="subtle"
          size="lg"
          @click="clear"
        />
      </template>

      <UButton
        to="#"
        label="Learn more"
        color="neutral"
        variant="subtle"
        size="lg"
      />
    </template> -->
  </UPageHero>
</template>
