<template>
  <div class="concluir-cadastro d-flex flex-column align-items-center">
    <img class="logo" src="@/assets/img/logo-laranja.svg" alt="Logo EasyJobs" />
    <div class="content d-flex flex-column justify-content-center align-items-center">
      <div class="content-wrapper shadow">
        <div class="header">
          <h1>Concluir cadastro</h1>
          <p>
            Agora que você já ativou sua conta, basta inserir as informações abaixo para concluir o
            cadastro!
          </p>
        </div>
        <div class="tipos">
          <label>Tipo:</label>
          <div class="inputs">
            <InputRadio
              label="Candidato"
              id="candidato"
              name="tipo"
              value="candidato"
              v-model="tipo"
            />
            <InputRadio label="Empresa" id="empresa" name="tipo" value="empresa" v-model="tipo" />
          </div>
        </div>
        <CandidatoForm @cadastro-concluido="handleCadastroConcluido" v-if="tipo === 'candidato'" />
        <EmpresaForm @cadastro-concluido="handleCadastroConcluido" v-if="tipo === 'empresa'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import setUsuario from '@/functions/setUsuario'
import router from '@/router'
import { ref } from 'vue'
import InputRadio from '../common/InputRadio.vue'
import CandidatoForm from './CandidatoForm.vue'
import EmpresaForm from './EmpresaForm.vue'

const tipo = ref('candidato')

function handleCadastroConcluido() {
  setUsuario()
  router.push('/')
}
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

.header {
  align-self: flex-start;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.25rem;
  font-weight: 600;
  margin: 0;
}

p {
  font-size: 1rem;
  margin: 0;
}

label {
  align-self: flex-start;
  font-size: 0.875rem;
  font-weight: 600;
}

.tipos {
  width: 100%;
  margin-bottom: 30px;
}

.tipos .inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

/* Responsivo */

@media screen and (max-width: 576px) {
  .content {
    width: 90%;
  }
}
</style>
