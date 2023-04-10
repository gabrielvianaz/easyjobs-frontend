<template>
  <div class="direita col p-0 d-flex flex-column align-items-center">
    <img class="logo" src="@/assets/img/logo-laranja.svg" alt="" />
    <div class="content d-flex flex-column justify-content-center">
      <div class="content-wrapper shadow">
        <CadastroForm
          v-if="!exibirAtivacao"
          @exibir-ativacao="exibirAtivacao = true"
          @set-credenciais="(credenciaisUpdated) => (credenciais = credenciaisUpdated)"
        />
        <AtivacaoComponent :credenciais="credenciais" v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Credenciais } from '@/types/Credenciais'
import CadastroForm from '@/components/cadastro/CadastroForm.vue'
import AtivacaoComponent from '@/components/ativacao/AtivacaoComponent.vue'

const credenciais = ref<Credenciais>({
  email: '',
  senha: ''
})
const exibirAtivacao = ref(false)
</script>

<style scoped>
.logo {
  height: 40px;
  margin: 30px 0;
}

.content {
  width: 500px;
  flex: 1;
}

.content-wrapper {
  padding: 20px;
  border-radius: 10px;
}

/* Responsivo */

@media screen and (max-width: 576px), screen and (min-width: 992px) and (max-width: 1200px) {
  .content {
    width: 90%;
  }
}
</style>
