<template>
  <input
    class="codigo-ativacao"
    type="text"
    :placeholder="modelValue"
    :value="modelValue"
    @input="modelUpdate"
    maxlength="1"
  />
</template>
<script lang="ts" setup>
const props = defineProps(['modelValue', 'position', 'length'])
const emit = defineEmits(['update:modelValue'])

function modelUpdate(event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value
  if (!isNaN(Number(value)) && value != '') {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
    focusProximoInput()
  } else {
    input.value = ''
    emit('update:modelValue', '')
  }
}

function focusProximoInput() {
  if (props.position != props.length - 1) {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input.codigo-ativacao')
    inputs[props.position + 1].focus()
    inputs[props.position + 1].select()
  }
}
</script>
<style scoped>
input {
  width: 100%;
  height: 60px;
  border: 3px solid #f97c09;
  border-radius: 5px;
  text-align: center;
}

input:focus {
  outline: none;
}

input.erro {
  color: red;
  border-color: red;
}
</style>
