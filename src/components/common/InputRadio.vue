<template>
  <div class="input-radio">
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      @input="modelUpdate"
      :checked="modelValue === value"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
defineProps(['label', 'id', 'name', 'value', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

function modelUpdate(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
label {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  border: 3px solid #fcddc1;
  border-radius: 5px;
  color: #fcddc1;
  cursor: pointer;
}

label::before {
  display: block;
  content: '';
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid #fcddc1;
  margin: 0 10px;
}

input:checked + label,
label:hover {
  color: #f97c09;
  border-color: #f97c09;
}

input:checked + label::before,
label:hover::before {
  background: #f97c09;
}

input {
  display: none;
}
</style>
