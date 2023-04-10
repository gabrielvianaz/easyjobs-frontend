export function senhaValida(senha: string) {
  return senha.length >= 8
}

export function emailValido(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function gerarMsgErro(erro: string) {
  const msgErro: HTMLParagraphElement = document.createElement('p')
  msgErro.classList.add('msg-erro')
  msgErro.innerText = erro
  return msgErro
}

export function exibirErro(mensagem: string, target: HTMLElement) {
  target.classList.add('erro')
  target.appendChild(gerarMsgErro(mensagem))
  throw Error(mensagem)
}

export function removerMsgErro() {
  const erroList = document.querySelectorAll('.erro')
  if (erroList.length) erroList.forEach((item) => item.classList.remove('erro'))
  const msgErroList = document.querySelectorAll('.msg-erro')
  if (msgErroList.length) msgErroList.forEach((item) => item.remove())
}
