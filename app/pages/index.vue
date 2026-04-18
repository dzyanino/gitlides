<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Login with Github',
    icon: 'i-simple-icons-github',
    color: 'neutral'
  },
  {
    label: 'Learn more',
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>

<template>
  <UPageHero
    title="You can go blabla"
    description="For blabla and blablabla, blabla bla blablabla."
    headline="Hehe"
    :links="links"
    class="w-full h-full"
  />
</template>
