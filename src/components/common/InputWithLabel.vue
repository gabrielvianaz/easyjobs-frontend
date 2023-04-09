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
        @input="modelUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps(['label', 'type', 'name', 'id', 'class', 'placeholder', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

function modelUpdate(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
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

.input-with-label.erro .input-wrapper.email::before {
  background-image: url('@/assets/img/icons/email-erro.svg');
}
.input-with-label.erro .input-wrapper.senha::before {
  background-image: url('@/assets/img/icons/senha-erro.svg');
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
