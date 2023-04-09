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

export function removerMsgErro() {
  const divErro = document.querySelector('.erro')
  if (divErro) divErro.classList.remove('erro')
  const msgErro = document.querySelector('.msg-erro')
  if (msgErro) msgErro.remove()
}
