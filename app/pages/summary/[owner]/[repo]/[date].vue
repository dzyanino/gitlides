<script lang="ts" setup>
import type { AccordionItem } from '@nuxt/ui'

const route = useRoute()

const owner = route.params.owner
const repo = route.params.repo
const date = route.params.date

const items: AccordionItem[] = [{ label: `${owner}/${repo} | ${date}` }]

const { data: groupedCommitsData } = useNuxtData<{
  groupedCommits: CommitGroup[]
  hasPreviousPage: boolean
  hasNextPage: boolean
}>('current-commits')

const group
  = groupedCommitsData.value
    ? groupedCommitsData.value.groupedCommits.filter(group => group.date == date)[0]
    : null

const content = ref(``)
</script>

<template>
  <div class="flex-1">
    <UContainer class="flex size-full">
      <div class="flex flex-col size-full gap-4 py-4">
        <div class="flex w-full items-center">
          <UButton
            to="/home"
            label="Back"
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="link"
            size="xs"
          />
        </div>

        <div class="flex flex-col md:flex-row size-full gap-8">
          <div class="flex flex-col w-full md:max-w-1/3 gap-4">
            <UAccordion
              v-if="group"
              :items
            >
              <template #content>
                <ul class="list-disc list-inside text-wrap font-semibold text-muted">
                  <template
                    v-for="commit in group.commits"
                    :key="commit.sha"
                  >
                    <li>
                      {{ commit.message }}
                    </li>
                  </template>
                </ul>
              </template>
            </UAccordion>
            <UButton label="Confirm" />
          </div>

          <UCard class="size-full">
            <!-- @vue-ignore -->
            <UEditor
              v-model="content"
              content-type="markdown"
              :starter-kit="{
                blockquote: false,
                headings: {
                  levels: [1, 2, 3, 4]
                },
                dropcursor: {
                  color: 'var(--ui-primary)',
                  width: 2
                },
                link: {
                  openOnClick: false
                }
              }"

              placeholder="Write here..."
              class="size-full"
            />
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
