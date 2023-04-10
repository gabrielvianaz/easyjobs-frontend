<template>
  <div class="login">
    <div class="header">
      <h1>Login</h1>
      <p>Seja bem-vindo novamente!</p>
    </div>
    <form class="login-form">
      <ImputWithLabel
        class="email"
        label="Email:"
        type="email"
        id="email"
        name="email"
        placeholder="Insira seu e-mail"
        v-model="credenciais.email"
        ref="emailInput"
      />
      <ImputWithLabel
        class="senha"
        label="Senha:"
        type="password"
        id="senha"
        name="senha"
        placeholder="Insira sua senha"
        v-model="credenciais.senha"
        ref="senhaInput"
      />
      <DefaultButton text="Acessar" @click.prevent="login()" v-if="!carregando" />
      <LoadingButton v-else />
    </form>
    <p class="msg-cadastro text-center">
      Não possui uma conta? <CallToAction to="/cadastro" text="Cadastre-se" />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { removerMsgErro, emailValido, senhaValida, exibirErro } from '@/utils/utils'
import { ref, type Ref } from 'vue'
import { api } from '@/api/config'
import ImputWithLabel from '@/components/common/InputWithLabel.vue'
import DefaultButton from '../common/DefaultButton.vue'
import LoadingButton from '../common/LoadingButton.vue'
import CallToAction from '../common/CallToAction.vue'
import type { Credenciais } from '@/types/Credenciais'
import router from '@/router'

const credenciais: Ref<Credenciais> = ref({
  email: '',
  senha: ''
})
const emailInput = ref(null)
const senhaInput = ref(null)
const carregando = ref(false)

const emit = defineEmits(['setCredenciais', 'exibirAtivacao'])

async function login() {
  try {
    validarCampos()
  } catch (e) {
    return console.log((e as Error).message)
  }
  carregando.value = true
  await api
    .post('/login', credenciais.value)
    .then(() => router.push('/'))
    .catch((e) => erroLoginHandler(e.response.data))
  carregando.value = false
}

function validarCampos() {
  removerMsgErro()
  validarEmail()
  validarSenha()
}

function validarEmail() {
  if (!emailValido(credenciais.value.email)) {
    if (credenciais.value.email.trim().length === 0) {
      erroEmail('Insira seu e-mail!')
    }
    erroEmail('O e-mail inserido é inválido!')
  }
}

function validarSenha() {
  if (!senhaValida(credenciais.value.senha)) {
    if (credenciais.value.senha.length === 0) {
      erroSenha('Insira sua senha!')
    }
    erroSenha('A senha deve possuir no mínimo 8 caracteres!')
  }
}

function erroEmail(mensagem: string) {
  const div: HTMLDivElement = (emailInput.value as any).$el
  exibirErro(mensagem, div)
}

function erroSenha(mensagem: string) {
  const div: HTMLDivElement = (senhaInput.value as any).$el
  exibirErro(mensagem, div)
}

function erroLoginHandler(erro: any) {
  try {
    if (erro.status === 401) return erroSenha(erro.mensagem)
    if (erro.status === 404) return erroEmail(erro.mensagem)
    if (erro.status === 403) {
      emit('setCredenciais', credenciais.value)
      emit('exibirAtivacao')
    }
  } catch (e) {
    return console.log((e as Error).message)
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.25rem;
  font-weight: 600;
  margin: 0;
}

p {
  font-size: 1rem;
  margin: 0;
}

.login-form {
  margin-top: 30px;
}

.esqueci {
  margin: 10px 0 30px 0;
}
</style>
