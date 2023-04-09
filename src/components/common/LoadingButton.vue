<template>
  <button class="" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Carregando...
  </button>
</template>

<style scoped>
button {
  width: 100%;
  height: 40px;
  background-color: #fb9d47 !important;
  border: none;
  color: #fff !important;
  border-radius: 5px;
  font-weight: 600;
  margin: 30px 0;
}

span.spinner-border {
  color: #fff !important;
}

button:focus,
button:hover {
  outline: none;
}
</style>
