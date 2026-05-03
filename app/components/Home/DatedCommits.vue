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
        <li class="text-wrap font-semibold">
          <NuxtLink
            :to="commit.html_url"
            external
          >
            {{ commit.message }}
          </NuxtLink>
        </li>
        <div
          class="flex items-center gap-2 ml-6 mt-2 text-sm"
          :class="{ 'mb-8': index < (group.commits.length - 1) }"
        >
          <UBadge
            color="neutral"
            variant="outline"
            class="size-fit"
          >
            {{ commit.sha.substring(0, 6) }}
          </UBadge>
          <UUser
            :name="commit.author.login"
            :description="commit.author.email"
            :avatar="{
              src: commit.author.avatar_url,
              loading: 'lazy',
              icon: 'i-lucide-image'
            }"
            size="xs"
            class="opacity-25 hover:opacity-100"
          />
        </div>
      </template>
    </ul>

    <template #footer>
      <div class="flex justify-end">
        <span>{{ group.commits.length }} commits</span>
      </div>
    </template>
  </UCard>
</template>
