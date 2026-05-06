<script lang="ts" setup>
const selectedRepo = inject('selectedRepo', shallowRef<GitHubRepo>())
</script>

<template>
  <div class="flex flex-col w-full md:h-fit items-start justify-start p-px">
    <UEmpty
      v-if="!selectedRepo"
      icon="i-lucide-folder-git"
      title="No repository selected"
      description="Please choose one."
      variant="outline"
      class="size-full"
    />
    <UCard
      v-else
      :description="selectedRepo.description ?? ''"
      variant="outline"
      class="size-full"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <span>{{ selectedRepo.full_name }}</span>

          <div class="flex items-center gap-2 text-sm">
            <UBadge
              color="neutral"
              variant="outline"
              icon="i-lucide-git-branch"
            >
              {{ selectedRepo.default_branch }}
            </UBadge>

            <UTooltip
              text="Is a fork"
              :delay-duration="0"
              arrow
            >
              <UBadge
                v-if="selectedRepo.fork"
                color="neutral"
                variant="subtle"
                icon="i-lucide-git-fork"
              />
            </UTooltip>
          </div>
        </div>
      </template>

      <div class="flex flex-col size-full gap-2">
        <div
          class="flex items-center justify-between gap-2 text-sm"
        >
          <span>Visibility:</span>
          <UBadge
            color="neutral"
            :variant="selectedRepo.private ? 'solid' : 'outline'"
          >
            {{ selectedRepo.private ? 'Private' : 'Public' }}
          </UBadge>
        </div>

        <div
          class="flex items-center justify-between gap-2 text-sm"
        >
          <span>Stargazers:</span>
          <UBadge
            color="neutral"
            variant="outline"
            icon="i-lucide-star"
          >
            {{ selectedRepo.stargazers_count }}
          </UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>
