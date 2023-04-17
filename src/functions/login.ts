import { api } from '../api/config'
import type { Credenciais } from './../types/Credenciais'
import setUsuario from './setUsuario'

export default async function login(credenciais: Credenciais) {
  await api.post('/login', credenciais)
  await setUsuario()
}
