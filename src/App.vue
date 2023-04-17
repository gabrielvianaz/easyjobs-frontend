<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import setUsuario from './functions/setUsuario'

onBeforeMount(() => setUsuario())
</script>
