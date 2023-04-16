export function formatarMinutosRestantes(segundos: number) {
  return Math.floor(segundos / 60)
    .toString()
    .padStart(2, '0')
}

export function formatarSegundosRestantes(segundos: number) {
  return Math.floor(segundos % 60)
    .toString()
    .padStart(2, '0')
}

export function formatarInputData(data: string) {
  if (data.length === 2 || data.length === 5) data += '/'
  return data
}

export function formatarInputCPF(cpf: string) {
  if (cpf.length === 3 || cpf.length === 7) cpf += '.'
  else if (cpf.length === 11) cpf += '-'
  return cpf
}

export function formatarInputCNPJ(cnpj: string) {
  if (cnpj.length === 2 || cnpj.length === 6) cnpj += '.'
  else if (cnpj.length === 10) cnpj += '/'
  else if (cnpj.length === 15) cnpj += '-'
  return cnpj
}

export function removerSimbolos(valor: string) {
  return valor
    .split('')
    .filter((valor) => !isNaN(Number(valor)))
    .join('')
}
