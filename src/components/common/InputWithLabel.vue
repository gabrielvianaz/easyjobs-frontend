<template>
  <div class="input-with-label">
    <label :for="id">{{ label }}</label>
    <div class="input-wrapper" :class="class">
      <input
        :type="type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="maxLength"
        @input="modelUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps([
  'label',
  'type',
  'name',
  'id',
  'class',
  'placeholder',
  'maxLength',
  'numerico',
  'modelValue'
])
const emit = defineEmits(['update:modelValue'])

function modelUpdate(event: Event) {
  const target = event.target as HTMLInputElement
  if (props.numerico) validarValorNumerico(target)
  emit('update:modelValue', target.value)
}

function validarValorNumerico(target: HTMLInputElement) {
  const valorDigitado = target.value[target.value.length - 1]
  if (isNaN(Number(valorDigitado))) target.value = target.value.replace(valorDigitado, '')
}
</script>

<style scoped>
.input-with-label {
  margin-bottom: 20px;
}

.input-with-label:last-of-type {
  margin-bottom: 0;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
}

.input-with-label.erro label {
  color: red;
}

.input-wrapper {
  display: flex;
}

.input-wrapper::before {
  position: absolute;
  display: block;
  content: '';
  width: 29px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: 13px center;
  background-size: 16px 16px;
}

.input-wrapper.email::before {
  background-image: url('@/assets/img/icons/email.svg');
}

.input-wrapper.senha::before {
  background-image: url('@/assets/img/icons/senha.svg');
}

.input-wrapper.confirmacao-senha::before {
  background-image: url('@/assets/img/icons/confirmacao-senha.svg');
}

.input-wrapper.candidato::before {
  background-image: url('@/assets/img/icons/candidato.svg');
}

.input-wrapper.cnpj::before {
  background-image: url('@/assets/img/icons/cnpj.svg');
}

.input-wrapper.cpf::before {
  background-image: url('@/assets/img/icons/cpf.svg');
}

.input-wrapper.data::before {
  background-image: url('@/assets/img/icons/data.svg');
}

.input-wrapper.nome-fantasia::before {
  background-image: url('@/assets/img/icons/nome-fantasia.svg');
}

.input-wrapper.razao-social::before {
  background-image: url('@/assets/img/icons/razao-social.svg');
}

.input-with-label.erro .input-wrapper.email::before {
  background-image: url('@/assets/img/icons/email-erro.svg');
}
.input-with-label.erro .input-wrapper.senha::before {
  background-image: url('@/assets/img/icons/senha-erro.svg');
}

.input-with-label.erro .input-wrapper.confirmacao-senha::before {
  background-image: url('@/assets/img/icons/confirmacao-senha-erro.svg');
}

.input-with-label.erro .input-wrapper.candidato::before {
  background-image: url('@/assets/img/icons/candidato-erro.svg');
}

.input-with-label.erro .input-wrapper.cnpj::before {
  background-image: url('@/assets/img/icons/cnpj-erro.svg');
}

.input-with-label.erro .input-wrapper.cpf::before {
  background-image: url('@/assets/img/icons/cpf-erro.svg');
}

.input-with-label.erro .input-wrapper.data::before {
  background-image: url('@/assets/img/icons/data-erro.svg');
}

.input-with-label.erro .input-wrapper.nome-fantasia::before {
  background-image: url('@/assets/img/icons/nome-fantasia-erro.svg');
}

.input-with-label.erro .input-wrapper.razao-social::before {
  background-image: url('@/assets/img/icons/razao-social-erro.svg');
}

input {
  width: 100%;
  height: 40px;
  border: 3px solid #f97c09;
  border-radius: 5px;
  font-size: 1rem;
  color: #f97c09;
  padding-left: 35px;
}

.input-with-label.erro input {
  border-color: red;
  color: red;
}

input:focus {
  outline: none;
}

::placeholder {
  color: #fcddc1;
}

.input-with-label.erro ::placeholder {
  color: #ffb2b2;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  -webkit-text-fill-color: #f97c09;
  caret-color: #f97c09;
}

.input-with-label.erro input:-webkit-autofill,
.input-with-label.erro input:-webkit-autofill:hover,
.input-with-label.erro input:-webkit-autofill:focus {
  -webkit-text-fill-color: red;
}
</style>
