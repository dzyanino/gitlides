<script lang="ts" setup>
const { user } = useUserSession()
</script>

<template>
  <div>{{ user }}</div>
</template>
