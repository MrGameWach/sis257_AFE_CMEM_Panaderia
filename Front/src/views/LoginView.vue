<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const clave = ref('')
const error = ref(false)

function onSubmit() {
  const authStore = useAuthStore()
  authStore.login(usuario.value, clave.value).catch(() => (error.value = true))
}
</script>

<template>
  <div class="login-container">
    <div class="header-space"></div>
    <h1 class="text-center">Bienvenido a Panaderia Gustos</h1>
    <p class="text-center tagline, black-letter">Disfruta de los sabores caseros y tradicionales</p>
    <form class="form" @submit.prevent="onSubmit">
      <label class="form-label">Usuario:</label>
      <input v-model="usuario" type="text" class="form-input" placeholder="Ingresa tu usuario" autofocus />

      <label class="form-label">Contraseña:</label>
      <input v-model="clave" type="password" class="form-input" placeholder="Ingresa tu contraseña" />

      <p v-if="error" class="text-danger">Usuario y/o contraseña incorrectos</p>
      <input type="submit" class="form-submit" value="Ingresar" />
    </form>
  </div>
</template>

<style scoped>
.login-container {
  background: url('https://source.unsplash.com/featured/?bakery') no-repeat center center/cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #ffcb74;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.tagline {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.form {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.form-label {
  font-size: 1rem;
  color: #6b4226;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 10px 15px;
  background: #fce8d5;
  border: 1px solid #c69c6d;
  border-radius: 5px;
  color: #6b4226;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.form-input::placeholder {
  color: #c69c6d;
}

.form-submit {
  background: #ffcb74;
  border: none;
  border-radius: 25px;
  color: #6b4226;
  font-size: 1rem;
  padding: 0.8rem 0;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.form-submit:hover {
  background: #fbb040;
  transform: scale(1.05);
}

.text-danger {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>

