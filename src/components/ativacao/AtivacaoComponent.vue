<template>
  <div class="ativacao animate__animated animate__fadeIn">
    <div class="header">
      <h1>Ativação</h1>
      <p>{{ mensagemAtivacao }} {{ credenciais.email }}</p>
    </div>
    <form class="ativacao-form">
      <div class="inputs-wrapper" ref="inputsDiv">
        <div class="inputs">
          <InputCodigoAtivacao
            v-for="(posicao, index) in codigo"
            v-model="codigo[index]"
            :position="index"
            :length="codigo.length"
          />
        </div>
      </div>
      <DefaultButton
        :disabled="!todosCamposPreenchidos"
        @click.prevent="ativar"
        text="Ativar"
        v-if="!carregandoAtivacao"
      />
      <LoadingButton v-else />
    </form>
    <p
      class="text-center reenviar-codigo"
      :class="{ clicavel: tempoRestante === 0 }"
      @click="tempoRestante === 0 ? renovar() : null"
      v-if="!carregandoRenovacao"
    >
      Reenviar código
      {{ tempoRestante > 0 ? `em ${formatarMinutos()}:${formatarSegundos()}` : '' }}
    </p>
    <LoadingSpinner v-else />
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api/config'
import router from '@/router'
import type { Ativacao } from '@/types/Ativacao'
import { gerarMsgErro, removerMsgErro } from '@/utils/utils'
import { ref, onMounted, computed, type Ref } from 'vue'
import DefaultButton from '../common/DefaultButton.vue'
import LoadingButton from '../common/LoadingButton.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import InputCodigoAtivacao from './InputCodigoAtivacao.vue'

const props = defineProps(['credenciais'])
const codigo = ref(['', '', '', '', '', ''])
const ativacao: Ref<Ativacao> = ref({
  email: props.credenciais.email,
  codigo: ''
})
const tempoRestante = ref(0)
const inputsDiv = ref<HTMLDivElement | null>(null)
const carregandoAtivacao = ref(false)
const carregandoRenovacao = ref(false)
const mensagemAtivacao = ref('Enviamos um código com 6 dígitos para o email')

onMounted(() => {
  iniciarContador()
})

const todosCamposPreenchidos = computed(() =>
  codigo.value.every((el) => !isNaN(Number(el)) && el != '')
)

function iniciarContador() {
  tempoRestante.value = 600
  const interval = setInterval(() => {
    tempoRestante.value--
    if (tempoRestante.value === 0) clearInterval(interval)
  }, 1000)
}

function formatarMinutos() {
  return Math.floor(tempoRestante.value / 60)
    .toString()
    .padStart(2, '0')
}

function formatarSegundos() {
  return Math.floor(tempoRestante.value % 60)
    .toString()
    .padStart(2, '0')
}

async function renovar() {
  carregandoRenovacao.value = true
  await api.post('/ativacao/renovar', props.credenciais).then(() => iniciarContador())
  mensagemAtivacao.value = 'Enviamos um novo código com 6 dígitos para o e-mail'
  carregandoRenovacao.value = false
}

async function ativar() {
  removerMsgErro()
  carregandoAtivacao.value = true
  await api
    .post('/ativacao', {
      ...ativacao.value,
      codigo: codigo.value.join('')
    })
    .then(() => router.push('/'))
    .catch((e) => {
      erroAtivacao(e.response.data.mensagem)
      carregandoAtivacao.value = false
    })
}

function erroAtivacao(mensagem: string) {
  const div: HTMLDivElement | null = inputsDiv.value
  const inputsList = div?.querySelectorAll('input')
  const p = gerarMsgErro(mensagem)
  p.classList.add('text-center')
  div?.appendChild(p)
  inputsList?.forEach((input) => input.classList.add('erro'))
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

.ativacao-form {
  margin-top: 30px;
}

.inputs {
  display: flex;
  gap: 10px;
  justify-content: center;
}

p.reenviar-codigo {
  font-weight: 600;
  color: #fcddc1;
}

p.reenviar-codigo.clicavel {
  color: #f97c09;
  cursor: pointer;
}

p.reenviar-codigo.clicavel:hover {
  opacity: 0.75;
}
</style>
