<template>
  <form class="animate__animated animate__fadeIn">
    <InputWithLabel
      class="cnpj"
      label="CNPJ:"
      type="text"
      id="cnpj"
      name="cnpj"
      placeholder="Insira o CNPJ da empresa"
      max-length="18"
      :numerico="true"
      v-model="empresa.cnpj"
      ref="cnpjInput"
    />
    <InputWithLabel
      class="data"
      label="Data de fundação:"
      type="text"
      id="data"
      name="data"
      placeholder="dd/mm/aaaa"
      max-length="10"
      :numerico="true"
      v-model="empresa.dataFundacao"
      ref="dataFundacaoInput"
    />
    <InputWithLabel
      class="razao-social"
      label="Razão social:"
      type="text"
      id="razao-social"
      name="razao-social"
      placeholder="Insira a razão social da empresa"
      v-model="empresa.razaoSocial"
      ref="razaoSocialInput"
    />
    <InputWithLabel
      class="nome-fantasia"
      label="Nome fantasia:"
      type="text"
      id="nome-fantasia"
      name="nome-fantasia"
      placeholder="Insira o nome fantasia da empresa"
      v-model="empresa.nomeFantasia"
      ref="nomeFantasiaInput"
    />
    <SelectWithLabel
      class="estado"
      label="Estado:"
      disabled-option-text="Selecione o estado da empresa"
      v-model="empresa.estado"
      ref="estadoInput"
    >
      <option v-for="estado in estados" :value="estado.sigla">{{ estado.nome }}</option>
    </SelectWithLabel>
    <SelectWithLabel
      class="cidade"
      label="Cidade:"
      disabled-option-text="Selecione a cidade da empresa"
      :disabled="!empresa.estado"
      v-model="empresa.cidade"
      ref="cidadeInput"
    >
      <option v-if="empresa.estado" v-for="cidade in cidades" :value="cidade.nome">
        {{ cidade.nome }}
      </option>
    </SelectWithLabel>
    <DefaultButton
      @click.prevent="handleConcluirCadastroClick"
      text="Concluir cadastro"
      v-if="!carregando"
    />
    <LoadingButtonVue v-else />
  </form>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch, type Ref } from 'vue'
import { api } from '@/api/config'
import { getCidades, getEstados } from '@/utils/localidades'
import { exibirMsgErro, removerMsgErro } from '@/utils/msgErro'
import setUsuario from '@/functions/setUsuario'
import { cnpjValido, dataValida } from '@/utils/validacoes'
import DefaultButton from '@/components/common/DefaultButton.vue'
import InputWithLabel from '@/components/common/InputWithLabel.vue'
import SelectWithLabel from '@/components/common/SelectWithLabel.vue'
import LoadingButtonVue from '@/components/common/LoadingButton.vue'
import type { Estado } from '@/types/Estado'
import type { Cidade } from '@/types/Cidade'
import type { Empresa } from '@/types/Empresa'
import { formatarInputCNPJ, formatarInputData, removerSimbolos } from '@/utils/format'

const empresa: Ref<Empresa> = ref({
  razaoSocial: '',
  nomeFantasia: '',
  cnpj: '',
  dataFundacao: '',
  cidade: '',
  estado: ''
})
const estados: Ref<null | Array<Estado>> = ref(null)
const cidades: Ref<null | Array<Cidade>> = ref(null)
const cnpjInput = ref(null)
const dataFundacaoInput = ref(null)
const razaoSocialInput = ref(null)
const nomeFantasiaInput = ref(null)
const estadoInput = ref(null)
const cidadeInput = ref(null)
const carregando = ref(false)
const emit = defineEmits(['cadastro-concluido'])

onBeforeMount(() => setEstados())

watch(
  () => empresa.value.estado,
  () => setCidades()
)

watch(
  () => empresa.value.dataFundacao,
  () => (empresa.value.dataFundacao = formatarInputData(empresa.value.dataFundacao))
)

watch(
  () => empresa.value.cnpj,
  () => (empresa.value.cnpj = formatarInputCNPJ(empresa.value.cnpj))
)

async function setEstados() {
  estados.value = await getEstados()
}

async function setCidades() {
  empresa.value.cidade = ''
  cidades.value = await getCidades(getIdEstado())
}

function getIdEstado() {
  let id: number = 0
  estados.value?.forEach((estado) => {
    if (estado.sigla === empresa.value.estado) id = estado.id
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
    await api.post('/empresas', {
      ...empresa.value,
      cnpj: removerSimbolos(empresa.value.cnpj)
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
  validarCNPJ()
  validarDataFundacao()
  validarRazaoSocial()
  validarNomeFantasia()
  validarEstado()
  validarCidade()
}

function validarCNPJ() {
  if (!cnpjValido(empresa.value.cnpj)) {
    if (empresa.value.cnpj.length === 0) erroCNPJ('Insira o CNPJ!')
    erroCNPJ('O CNPJ inserido é inválido!')
  }
}

function validarDataFundacao() {
  if (!dataValida(empresa.value.dataFundacao)) {
    if (empresa.value.dataFundacao.length === 0) erroDataFundacao('Insira a data de fundação!')
    erroDataFundacao('A data de fundação inserida é inválida!')
  }
}

function validarRazaoSocial() {
  if (empresa.value.razaoSocial.trim().length === 0) erroRazaoSocial('Insira a razão social!')
}

function validarNomeFantasia() {
  if (empresa.value.nomeFantasia.trim().length === 0) erroNomeFantasia('Insira o nome fantasia!')
}

function validarEstado() {
  if (!empresa.value.estado) erroEstado('Selecione o estado!')
}

function validarCidade() {
  if (!empresa.value.cidade) erroCidade('Selecione a cidade!')
}

function erroCNPJ(mensagem: string) {
  const div: HTMLDivElement = (cnpjInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroDataFundacao(mensagem: string) {
  const div: HTMLDivElement = (dataFundacaoInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroRazaoSocial(mensagem: string) {
  const div: HTMLDivElement = (razaoSocialInput.value as any).$el
  exibirMsgErro(mensagem, div)
}

function erroNomeFantasia(mensagem: string) {
  const div: HTMLDivElement = (nomeFantasiaInput.value as any).$el
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
    if (erro.status === 400) return erroCNPJ(erro.mensagem)
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
