import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Usuario } from '@/types/Usuario'

export const useUsuarioStore = defineStore('usuario', () => {
  const usuario: Ref<undefined | null | Usuario> = ref(undefined)

  const get = computed(() => usuario.value)

  function set(dadosUsuario: Usuario | null) {
    usuario.value = dadosUsuario
  }

  return {
    get,
    set
  }
})
