<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const route = useRoute()

const isLogOutModalOpen = shallowRef<boolean>(false)
const isLogOutButtonLoading = shallowRef<boolean>(false)

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: `${(user.value && user.value.user_metadata) ? user.value.user_metadata.name : 'no user'}`,
      description: `${(user.value && user.value.user_metadata) ? user.value.user_metadata.user_name : 'login first'}`,
      type: 'label'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect: () => isLogOutModalOpen.value = true
    }
  ]
])

async function signOut() {
  isLogOutButtonLoading.value = true

  const { error } = await supabase.auth.signOut()

  if (error) console.error(error)

  isLogOutModalOpen.value = false

  navigateTo('/login')
}

onUnmounted(() => {
  isLogOutButtonLoading.value = false
})
</script>

<template>
  <UApp>
    <UHeader
      title="Gitlides"
      class="border-none"
    >
      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/dzyanino/gitlides"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />

        <template v-if="user && route.path != '/'">
          <UDropdownMenu
            :items
            arrow
          >
            <UButton
              v-bind="
                user.user_metadata
                  ? {
                    avatar: {
                      src: `${user.user_metadata.avatar_url}`,
                      loading: 'lazy'
                    }
                  }
                  : { icon: 'i-lucide-circle-user' }
              "
              color="neutral"
              variant="ghost"
            />
          </UDropdownMenu>
        </template>
      </template>
    </UHeader>

    <UMain class="flex">
      <slot />
    </UMain>

    <UModal
      v-model:open="isLogOutModalOpen"
      title="Wait"
      description="You'll need to login again"
      :ui="{ footer: 'justify-end' }"
    >
      <template #footer="{ close }">
        <UButton
          label="Cancel"
          color="neutral"
          variant="outline"
          @click="close"
        />
        <UButton
          label="Confirm"
          color="error"
          :loading="isLogOutButtonLoading"
          @click="signOut"
        />
      </template>
    </UModal>
  </UApp>
</template>
