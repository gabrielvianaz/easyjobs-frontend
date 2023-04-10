<template>
  <button :disabled="disabled">{{ text }}</button>
</template>

<script lang="ts" setup>
defineProps(['text', 'disabled'])
</script>

<style scoped>
button {
  width: 100%;
  height: 40px;
  background: #f97c09;
  color: #fff;
  border: 3px solid #f97c09;
  border-radius: 5px;
  font-weight: 600;
  margin: 30px 0;
}

button:focus,
button:hover,
button:disabled {
  outline: none;
  opacity: 0.75;
}
</style>
