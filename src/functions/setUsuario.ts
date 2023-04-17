import { useUsuarioStore } from '../stores/usuario'
import { api } from '../api/config'
import router from '@/router'
import type { Usuario } from '@/types/Usuario'

export default async function setUsuario() {
  const usuarioStore = useUsuarioStore()

  await api
    .get('/usuario')
    .then((r) => {
      const usuario: Usuario = r.data
      usuarioStore.set(usuario)
      if (usuario.tipoVinculo === null) router.push('/concluir-cadastro')
    })
    .catch(() => usuarioStore.set(null))
}
