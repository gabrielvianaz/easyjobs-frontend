<template>
  <section class="login container-fluid d-grid animate__animated animate__fadeIn">
    <div class="row">
      <LoginEsquerda />
      <LoginDireita />
    </div>
  </section>
</template>

<script lang="ts" setup>
import LoginEsquerda from '@/components/login/LoginEsquerda.vue'
import LoginDireita from '@/components/login/LoginDireita.vue'
</script>
