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
              <RouterLink to="/clientes" class="nav-link click-scroll text-dark">Clientes</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/empleados" class="nav-link click-scroll text-dark">Empleados</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/inventarios" class="nav-link click-scroll text-dark">Inventarios</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/pedidos" class="nav-link click-scroll text-dark">Pedidos</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/productos" class="nav-link click-scroll text-dark">Productos</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/proveedores" class="nav-link click-scroll text-dark">Proveedoress</RouterLink>
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
