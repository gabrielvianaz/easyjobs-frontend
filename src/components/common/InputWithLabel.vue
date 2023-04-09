<template>
  <div class="input-with-label">
    <label for="senha">{{ label }}</label>
    <input
      :class="class"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="modelUpdate"
    />
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

input {
  width: 100%;
  height: 40px;
  border: 3px solid #f97c09;
  border-radius: 5px;
  font-size: 1rem;
  color: #f97c09;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 16px 16px;
  padding: 0 36px;
}

input.email {
  background-image: url('@/assets/img/icons/email.svg');
}

input.senha {
  background-image: url('@/assets/img/icons/senha.svg');
}

input:focus {
  outline: none;
}

::placeholder {
  color: #fcddc1;
}
</style>
