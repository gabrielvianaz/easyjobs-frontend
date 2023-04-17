<template>
  <form class="animate__animated animate__fadeIn">
    <InputWithLabel
      class="cpf"
      label="CPF:"
      type="text"
      id="cpf"
      name="cpf"
      placeholder="Insira o seu CPF"
      max-length="14"
      :numerico="true"
      v-model="candidato.cpf"
      ref="cpfInput"
    />
    <InputWithLabel
      class="data"
      label="Data de nascimento:"
      type="text"
      id="data"
      name="data"
      placeholder="dd/mm/aaaa"
      max-length="10"
      :numerico="true"
      v-model="candidato.dataNascimento"
      ref="dataNascimentoInput"
    />
    <InputWithLabel
      class="candidato"
      label="Nome:"
      type="text"
      id="nome"
      name="nome"
      placeholder="Insira o seu nome completo"
      v-model="candidato.nome"
      ref="nomeInput"
    />
    <SelectWithLabel
      class="genero"
      label="Gênero:"
      disabled-option-text="Selecione o seu gênero"
      v-model="candidato.genero"
      ref="generoInput"
    >
      <option value="FEMININO">Feminino</option>
      <option value="MASCULINO">Masculino</option>
    </SelectWithLabel>
    <SelectWithLabel
      class="estado"
      label="Estado:"
      disabled-option-text="Selecione o seu estado"
      v-model="candidato.estado"
      ref="estadoInput"
    >
      <option v-for="estado in estados" :value="estado.sigla">{{ estado.nome }}</option>
    </SelectWithLabel>
    <SelectWithLabel
      class="cidade"
      label="Cidade:"
      disabled-option-text="Selecione a sua cidade"
      :disabled="!candidato.estado"
      v-model="candidato.cidade"
      ref="cidadeInput"
    >
      <option v-if="candidato.estado" v-for="cidade in cidades" :value="cidade.nome">
        {{ cidade.nome }}
      </option>
    </SelectWithLabel>
    <DefaultButton
      @click.prevent="handleConcluirCadastroClick"
      text="Concluir cadastro"
      v-if="!carregando"
    />
    <LoadingButton v-else />
  </form>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch, type Ref } from 'vue'
import { formatarInputCPF, formatarInputData, removerSimbolos } from '@/utils/format'
import { getCidades, getEstados } from '@/utils/localidades'
import type { Candidato } from '@/types/Candidato'
import type { Cidade } from '@/types/Cidade'
import type { Estado } from '@/types/Estado'
import InputWithLabel from '@/components/common/InputWithLabel.vue'
import SelectWithLabel from '@/components/common/SelectWithLabel.vue'
import DefaultButton from '@/components/common/DefaultButton.vue'
import LoadingButton from '../common/LoadingButton.vue'
import { exibirMsgErro, removerMsgErro } from '@/utils/msgErro'
import { cpfValido, dataValida } from '@/utils/validacoes'
import { api } from '@/api/config'
import setUsuario from '@/functions/setUsuario'

const candidato: Ref<Candidato> = ref({
  cpf: '',
  dataNascimento: '',
  nome: '',
  genero: '',
  estado: '',
  cidade: ''
})
const estados: Ref<null | Array<Estado>> = ref(null)
const cidades: Ref<null | Array<Cidade>> = ref(null)
const cpfInput = ref(null)
const dataNascimentoInput = ref(null)
const nomeInput = ref(null)
const generoInput = ref(null)
const estadoInput = ref(null)
const cidadeInput = ref(null)
const carregando = ref(false)
const emit = defineEmits(['cadastro-concluido'])

onBeforeMount(() => setEstados())

watch(
  () => candidato.value.estado,
  () => setCidades()
)

watch(
  () => candidato.value.dataNascimento,
  () => (candidato.value.dataNascimento = formatarInputData(candidato.value.dataNascimento))
)

watch(
  () => candidato.value.cpf,
  () => (candidato.value.cpf = formatarInputCPF(candidato.value.cpf))
)

async function setEstados() {
  estados.value = await getEstados()
}

async function setCidades() {
  candidato.value.cidade = ''
  cidades.value = await getCidades(getIdEstado())
}

function getIdEstado() {
  let id: number = 0
  estados.value?.forEach((estado) => {
    if (estado.sigla === candidato.value.estado) id = estado.id
  })
  return id
}

function handleConcluirCadastroClick() {
  try {
    validarCampos()
    concluirCadastro()
  } catch (e) {
    return console.log((e as Error).message)
  }
}

async function concluirCadastro() {
  try {
    carregando.value = true
    await api.post('/candidatos', {
      ...candidato.value,
      cpf: removerSimbolos(candidato.value.cpf)
    })
    emit('cadastro-concluido')
  } catch (e) {
    erroConcluirCadastroHandler((e as any).response.data)
  } finally {
    carregando.value = false
  }
}

function validarCampos() {
  removerMsgErro()
  validarCPF()
  validarDataNascimento()
  validarNome()
  validarGenero()
  validarEstado()
  validarCidade()
}

function validarCPF() {
  if (!cpfValido(candidato.value.cpf)) {
    if (candidato.value.cpf.length === 0) erroCPF('Insira seu CPF!')
    erroCPF('O CPF inserido é inválido!')
  }
}

function validarDataNascimento() {
  if (!dataValida(candidato.value.dataNascimento)) {
    if (candidato.value.dataNascimento.length === 0)
      erroDataNascimento('Insira sua data de nascimento!')
    erroDataNascimento('A data de nascimento inserida é inválida!')
  }
}

function validarNome() {
  if (candidato.value.nome.trim().length === 0) erroNome('Insira seu nome!')
}

function validarGenero() {
  if (!candidato.value.genero) erroGenero('Selecione seu gênero!')
}

function validarEstado() {
  if (!candidato.value.estado) erroEstado('Selecione seu estado!')
}

function validarCidade() {
  if (!candidato.value.cidade) erroCidade('Selecione sua cidade!')
}

function erroCPF(mensagem: string) {
  const div: HTMLDivElement = (cpfInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroDataNascimento(mensagem: string) {
  const div: HTMLDivElement = (dataNascimentoInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroNome(mensagem: string) {
  const div: HTMLDivElement = (nomeInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroGenero(mensagem: string) {
  const div: HTMLDivElement = (generoInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroEstado(mensagem: string) {
  const div: HTMLDivElement = (estadoInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroCidade(mensagem: string) {
  const div: HTMLDivElement = (cidadeInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroConcluirCadastroHandler(erro: any) {
  try {
    if (erro.status === 400) return erroCPF(erro.mensagem)
  } catch (e) {
    return console.log((e as Error).message)
  }
}
</script>

<style scoped>
form {
  width: 100%;
}
</style>
