<script lang="ts" setup>
const { data: repos } = await useFetch('/api/github/saved-repo')
</script>

<template>
  <div>{{ repos }}</div>
</template>
