import moment from 'moment'

export function senhaValida(senha: string) {
  return senha.length >= 8
}

export function emailValido(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function cpfValido(cpf: string) {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/
  return cpfRegex.test(cpf)
}

export function cnpjValido(cnpj: string) {
  const cnpjRegex = /^\d{2}(\.?\d{3}){2}\/?\d{4}-?\d{2}$/
  return cnpjRegex.test(cnpj)
}

export function dataValida(data: string) {
  return moment(data, 'DD/MM/YYYY').isValid()
}
