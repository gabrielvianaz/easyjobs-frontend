<template>
  <div class="direita col p-0 d-flex flex-column align-items-center">
    <img class="logo" src="@/assets/img/logo-laranja.svg" alt="" />
    <div class="content d-flex flex-column justify-content-center">
      <div class="content-wrapper shadow">
        <div class="header">
          <h1>Cadastro</h1>
          <p>Crie sua conta e junte-se a nós!</p>
        </div>
        <form class="cadastro-form" ref="cadastroForm">
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
            placeholder="Crie sua senha"
            v-model="credenciais.senha"
            ref="senhaInput"
          />
          <ImputWithLabel
            class="confirmacao-senha"
            label="Confirmação da senha:"
            type="password"
            id="confirmacao-senha"
            name="confirmacao-senha"
            placeholder="Confirme a senha digitada"
            v-model="confirmacaoSenha"
            ref="confirmacaoSenhaInput"
          />
          <DefaultButton text="Cadastrar" @click.prevent="cadastrar()" v-if="!carregando" />
          <LoadingButton v-else />
        </form>
        <p class="msg-cadastro text-center">
          Já possui uma conta? <CallToAction to="/login" text="Faça login" />
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
const confirmacaoSenhaInput = ref(null)
const cadastroForm: Ref<HTMLFormElement | null> = ref(null)
const confirmacaoSenha = ref('')
const carregando = ref(false)

async function cadastrar() {
  try {
    validarCampos()
  } catch (e) {
    return console.log((e as Error).message)
  }
  carregando.value = true
  await api
    .post('/cadastro', credenciais.value)
    .then(() => router.push('/'))
    .catch((e) => handleErroCadastro(e.response.data))
  carregando.value = false
}

function validarCampos() {
  removerMsgErro()
  validarEmail()
  validarSenha()
  validarConfirmacaoSenha()
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

function validarConfirmacaoSenha() {
  if (confirmacaoSenha.value.length === 0) {
    erroConfirmacaoSenha('Insira a confirmação da senha!')
    throw Error('Insira a confirmação da senha!')
  }
  if (confirmacaoSenha.value != credenciais.value.senha) {
    erroConfirmacaoSenha('As senhas informadas são diferentes!')
    throw Error('As senhas informadas são diferentes!')
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

function erroConfirmacaoSenha(mensagem: string) {
  const div: HTMLDivElement = (confirmacaoSenhaInput.value as any).$el
  div.classList.add('erro')
  div.appendChild(gerarMsgErro(mensagem))
}

function handleErroCadastro(erro: any) {
  if (erro.status === 409) return erroEmail(erro.mensagem)
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

.cadastro-form {
  margin-top: 30px;
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
