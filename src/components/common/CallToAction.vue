<template>
  <RouterLink :to="to">{{ text }}</RouterLink>
</template>

<script lang="ts" setup>
defineProps(['to', 'text'])
</script>

<style scoped>
a {
  color: #f97c09;
  text-decoration: none;
  font-weight: 600;
}

a:focus,
a:hover {
  outline: none;
  opacity: 0.75;
}
</style>
