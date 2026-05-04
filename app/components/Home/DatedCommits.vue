<script lang="ts" setup>
defineProps<{
  group: CommitGroup
}>()

const user = useSupabaseUser()
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
            target="_blank"
            external
            class="hover:text-primary"
          >
            {{ commit.message }}
          </NuxtLink>
        </li>
        <div
          class="flex items-center gap-2 ml-6 mt-2 text-sm"
          :class="{ 'mb-8': index < (group.commits.length - 1) }"
        >
          <UBadge
            variant="outline"
            color="neutral"
            class="size-fit"
          >
            {{ commit.sha.substring(0, 6) }}
          </UBadge>
          <UUser
            v-bind="
              user?.user_metadata?.user_name != commit.author.login
                ? {
                  to: `https://github.com/${commit.author.login}`,
                  target: '_blank'
                }
                : {}
            "
            :name="commit.author.login"
            :avatar="{
              src: commit.author.avatar_url,
              loading: 'lazy',
              icon: 'i-lucide-image'
            }"
            size="xs"
            class="hover:opacity-100"
            :class="user?.user_metadata?.user_name == commit.author.login ? 'opacity-25' : 'opacity-75'"
          />
        </div>
      </template>
    </ul>

    <template #footer>
      <div class="flex justify-end">
        <span>{{ group.commits.length }} commit{{ group.commits.length > 1 ? 's' : '' }}</span>
      </div>
    </template>
  </UCard>
</template>
