<template>
  <div class="select-with-label">
    <label>{{ label }}</label>
    <div class="select-wrapper" :class="class">
      <select
        :disabled="disabled"
        :value="modelValue"
        @change="modelUpdate"
        :class="modelValue === '' ? 'disabledOptionSelected' : ''"
      >
        <option value="" disabled selected>{{ disabledOptionText }}</option>
        <slot></slot>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps(['label', 'class', 'disabledOptionText', 'disabled', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

function modelUpdate(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<style scoped>
.select-with-label {
  margin-bottom: 20px;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
}

.select-with-label.erro label {
  color: red;
}

.select-wrapper {
  display: flex;
}

.select-wrapper::before {
  position: absolute;
  display: block;
  content: '';
  width: 29px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: 13px center;
  background-size: 16px 16px;
}

.select-wrapper.genero::before {
  background-image: url('@/assets/img/icons/genero.svg');
}

.select-with-label.erro .select-wrapper.genero::before {
  background-image: url('@/assets/img/icons/genero-erro.svg');
}

.select-wrapper.cidade::before {
  background-image: url('@/assets/img/icons/cidade.svg');
}

.select-with-label.erro .select-wrapper.cidade::before {
  background-image: url('@/assets/img/icons/cidade-erro.svg');
}

.select-wrapper.estado::before {
  background-image: url('@/assets/img/icons/estado.svg');
}

.select-with-label.erro .select-wrapper.estado::before {
  background-image: url('@/assets/img/icons/estado-erro.svg');
}

select {
  width: 100%;
  height: 40px;
  border: 3px solid #f97c09;
  border-radius: 5px;
  font-size: 1rem;
  color: #f97c09;
  appearance: none;
  background-color: #fff;
  background-image: url('@/assets/img/icons/select-arrow.svg');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  padding-left: 35px;
}

select.disabledOptionSelected {
  color: #fcddc1;
}

.select-with-label.erro select {
  border-color: red;
  background-image: url('@/assets/img/icons/select-arrow-erro.svg');
}

.select-with-label.erro label,
.select-with-label.erro select {
  color: red;
}

select:focus {
  outline: none;
}

option:disabled {
  color: #fcddc1;
}
</style>
