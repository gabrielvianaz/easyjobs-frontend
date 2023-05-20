import type { Role } from './Role'

export type Usuario = {
  id: number
  email: string
  roles: Array<Role>
}
