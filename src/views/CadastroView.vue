<template>
  <section class="cadastro container-fluid d-grid animate__animated animate__fadeIn">
    <div class="row">
      <CadastroEsquerda />
      <CadastroDireita />
    </div>
  </section>
</template>

<script lang="ts" setup>
import CadastroEsquerda from '@/components/cadastro/CadastroEsquerda.vue'
import CadastroDireita from '@/components/cadastro/CadastroDireita.vue'
</script>

<style scoped>
.cadastro {
  height: 100%;
}
</style>
