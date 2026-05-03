<script lang="ts" setup>
defineProps<{
  group: CommitGroup
}>()
</script>

<template>
  <UCard
    :title="group.date"
  >
    <ul class="list-disc list-inside">
      <template
        v-for="(commit, index) in group.commits"
        :key="commit.sha"
      >
        <li class="text-md font-bold">
          {{ commit.message }}
        </li>
        <span class="indent-6 line-clamp-1">{{ commit.sha }}</span>
        <span class="indent-6 line-clamp-1">{{ commit.author.login }}</span>
        <span
          class="indent-6 line-clamp-1"
          :class="{ 'mb-4': index < (group.commits.length - 1) }"
        >
          {{ commit.verified }}
        </span>
      </template>
    </ul>
  </UCard>
</template>
