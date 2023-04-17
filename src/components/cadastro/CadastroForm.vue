<template>
  <div class="cadastro">
    <div class="header">
      <h1>Cadastro</h1>
      <p>Crie sua conta e junte-se a nós!</p>
    </div>
    <form class="cadastro-form">
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
      <DefaultButton text="Cadastrar" @click.prevent="handleClickCadastro" v-if="!carregando" />
      <LoadingButton v-else />
    </form>
    <p class="msg-login text-center">
      Já possui uma conta? <CallToAction to="/login" text="Faça login" />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { api } from '@/api/config'
import ImputWithLabel from '@/components/common/InputWithLabel.vue'
import DefaultButton from '../common/DefaultButton.vue'
import LoadingButton from '../common/LoadingButton.vue'
import CallToAction from '../common/CallToAction.vue'
import type { Credenciais } from '@/types/Credenciais'
import { exibirMsgErro, removerMsgErro } from '@/utils/msgErro'
import { emailValido, senhaValida } from '@/utils/validacoes'

const credenciais: Ref<Credenciais> = ref({
  email: '',
  senha: ''
})
const confirmacaoSenha = ref('')
const emailInput = ref(null)
const senhaInput = ref(null)
const confirmacaoSenhaInput = ref(null)
const carregando = ref(false)

const emit = defineEmits(['setCredenciais', 'exibirAtivacao'])

function handleClickCadastro() {
  try {
    validarCampos()
    cadastrar()
  } catch (e) {
    return console.log((e as Error).message)
  }
}

async function cadastrar() {
  try {
    carregando.value = true
    await api.post('/cadastro', credenciais.value)
    emit('setCredenciais', credenciais.value)
    emit('exibirAtivacao')
  } catch (e) {
    return erroCadastroHandler((e as any).response.data)
  } finally {
    carregando.value = false
  }
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

function validarConfirmacaoSenha() {
  if (confirmacaoSenha.value.length === 0) {
    erroConfirmacaoSenha('Insira a confirmação da senha!')
  }
  if (confirmacaoSenha.value != credenciais.value.senha) {
    erroConfirmacaoSenha('As senhas informadas são diferentes!')
  }
}

function erroEmail(mensagem: string) {
  const div: HTMLDivElement = (emailInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroSenha(mensagem: string) {
  const div: HTMLDivElement = (senhaInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroConfirmacaoSenha(mensagem: string) {
  const div: HTMLDivElement = (confirmacaoSenhaInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroCadastroHandler(erro: any) {
  try {
    if (erro.status === 409) erroEmail(erro.mensagem)
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

.cadastro-form {
  margin-top: 30px;
}
</style>
