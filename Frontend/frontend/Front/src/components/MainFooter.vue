
<script setup lang="ts"></script>


<template>
 <footer class="bakery-footer">
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-12 mb-4">
        <h2 class="footer-title">La Panadería Delicias</h2>
        <p class="footer-description">Sabor y tradición en cada mordida. Visítanos para descubrir nuestras recetas caseras.</p>
      </div>

      <div class="col-lg-6 col-12 mb-4 d-flex justify-content-lg-end align-items-center">
        <ul class="social-icon d-flex">
          <li class="social-icon-item">
            <a href="#" class="social-icon-link">
              <span class="bi-facebook"></span>
            </a>
          </li>
          <li class="social-icon-item">
            <a href="#" class="social-icon-link">
              <span class="bi-instagram"></span>
            </a>
          </li>
          <li class="social-icon-item">
            <a href="#" class="social-icon-link">
              <span class="bi-twitter"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <h5 class="footer-subtitle">Enlaces útiles</h5>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Inicio</a></li>
          <li><a href="#" class="footer-link">Nosotros</a></li>
          <li><a href="#" class="footer-link">Productos</a></li>
          <li><a href="#" class="footer-link">Contacto</a></li>
        </ul>
      </div>

      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <h5 class="footer-subtitle">Contacto</h5>
        <p><a href="tel:+123456789" class="footer-link">Teléfono: +1 234 567 89</a></p>
        <p><a href="mailto:info@panaderiadelicias.com" class="footer-link">Email: info@panaderiagustos.com</a></p>
      </div>

      <div class="col-lg-4 col-12 mb-4">
        <h5 class="footer-subtitle">Ubicación</h5>
        <p>Av. Principal 123, Centro, Ciudad, País</p>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <p class="copyright-text">© 2024 La Panadería Gustos. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  </div>
</footer>

</template>

<style scoped>
.bakery-footer {
  background-color: #f4e1d2; 
  color: #6b4f4f;
  padding: 40px 0;
}

.footer-title {
  font-size: 2rem;
  color: #a35d5d;
}

.footer-description {
  margin-bottom: 20px;
  color: #6b4f4f;
}

.footer-subtitle {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #a35d5d;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  display: block;
  color: #6b4f4f;
  text-decoration: none;
  margin-bottom: 10px;
}

.footer-link:hover {
  color: #a35d5d;
}

.social-icon {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 15px;
}

.social-icon-link {
  color: #6b4f4f;
  font-size: 1.5rem;
}

.footer-bottom {
  background-color: #e0c3a1;
  padding: 15px 0;
  margin-top: 30px;
  text-align: center;
}
</style>
