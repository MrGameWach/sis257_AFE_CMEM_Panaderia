<script setup lang="ts">
import { useRoute } from 'vue-router'

const location = useRoute()
</script>

<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-custom"
      :style="location.path != '/' ? 'background-color: #f5deb3;' : ''" 
    >
      <div class="container d-flex justify-content-between">
        <h1 class="navbar-brand ms-3 text-large">Panadería Gustos</h1>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link click-scroll text-dark">Inicio</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/about" class="nav-link click-scroll text-dark">Acerca De</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/interpretes" class="nav-link click-scroll text-dark">Intérpretes</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/canciones" class="nav-link click-scroll text-dark">Canciones</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

.text-large {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000; 
}


.navbar-custom {
  background-color: #f5deb3; 
}
</style>
