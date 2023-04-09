<template>
  <div class="esquerda col p-0 d-flex flex-column align-items-center">
    <img class="logo" src="@/assets/img/logo-laranja.svg" alt="" />
    <div class="content d-flex flex-column justify-content-center">
      <div class="content-wrapper shadow">
        <div class="header">
          <h1>Login</h1>
          <p>Seja bem-vindo novamente!</p>
        </div>
        <form class="login-form" ref="loginForm">
          <ImputWithLabel
            class="email"
            label="Email:"
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            v-model="credenciais.email"
            ref="emailInput"
          />
          <ImputWithLabel
            class="senha"
            label="Senha:"
            type="password"
            id="senha"
            name="senha"
            placeholder="Digite sua senha"
            v-model="credenciais.senha"
            ref="senhaInput"
          />
          <p class="esqueci text-end">
            <CallToAction to="/login" text="Esqueci a senha" />
          </p>
          <DefaultButton text="Acessar" @click.prevent="login()" v-if="!carregando" />
          <LoadingButton v-else />
        </form>
        <p class="msg-cadastro text-center">
          Não possui uma conta? <CallToAction to="/login" text="Cadastre-se" />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import ImputWithLabel from '@/components/common/InputWithLabel.vue'
import DefaultButton from '../common/DefaultButton.vue'
import LoadingButton from '../common/LoadingButton.vue'
import CallToAction from '../common/CallToAction.vue'
import type { Credenciais } from '@/types/Credenciais'
import { api } from '@/api/config'
import { removerMsgErro, emailValido, gerarMsgErro, senhaValida } from '@/utils/utils'
import router from '@/router'

const credenciais = ref<Credenciais>({
  email: '',
  senha: ''
})
const emailInput = ref(null)
const senhaInput = ref(null)
const loginForm: Ref<HTMLFormElement | null> = ref(null)
const carregando = ref(false)

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
    .catch((e) => handleErroLogin(e.response.data))
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
      throw Error('Insira seu e-mail!')
    }
    erroEmail('O e-mail inserido é inválido!')
    throw Error('O e-mail inserido é inválido!')
  }
}

function validarSenha() {
  if (!senhaValida(credenciais.value.senha)) {
    if (credenciais.value.senha.length === 0) {
      erroSenha('Insira sua senha!')
      throw Error('Insira sua senha!')
    }
    erroSenha('A senha deve possuir no mínimo 8 caracteres!')
    throw Error('A senha deve possuir no mínimo 8 caracteres!')
  }
}

function erroEmail(mensagem: string) {
  const div: HTMLDivElement = (emailInput.value as any).$el
  div.classList.add('erro')
  div.appendChild(gerarMsgErro(mensagem))
}

function erroSenha(mensagem: string) {
  const div: HTMLDivElement = (senhaInput.value as any).$el
  div.classList.add('erro')
  div.appendChild(gerarMsgErro(mensagem))
}

function handleErroLogin(erro: any) {
  if (erro.status === 401) return erroSenha(erro.mensagem)
  if (erro.status === 404) return erroEmail(erro.mensagem)
}
</script>

<style scoped>
.logo {
  height: 40px;
  margin: 30px 0;
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

.content {
  width: 500px;
  flex: 1;
}

.content-wrapper {
  padding: 20px;
  border-radius: 10px;
}

.login-form {
  margin: 30px 0;
}

.esqueci {
  margin: 10px 0 30px 0;
}

/* Responsivo */

@media screen and (max-width: 576px), screen and (min-width: 992px) and (max-width: 1200px) {
  .content {
    width: 90%;
  }
}
</style>
