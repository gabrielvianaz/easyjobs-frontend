import type { Cidade } from '@/types/Cidade'
import type { Estado } from '@/types/Estado'
import { apiWithoutCredentials } from './../api/config'

export async function getEstados() {
  let estados: Array<Estado> = []
  await apiWithoutCredentials
    .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then((r) => (estados = r.data))
  return estados
}

export async function getCidades(idEstado: number) {
  let cidades: Array<Cidade> = []
  await apiWithoutCredentials
    .get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/distritos?orderBy=nome`
    )
    .then((r) => (cidades = r.data))
  return cidades
}
