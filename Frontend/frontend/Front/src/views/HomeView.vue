<script setup lang="ts"></script>

<template>
  <div>
    <section class="hero-section">
      <div class="container text-container">
        <h2 class="title">Sabores únicos y de buena calidad</h2>
        <p class="subtitle">Ve nuestra selección de sabores y productos</p>
      </div>
    </section>

    <section class="about-section section-padding" id="section_2">
  <div class="container">
    <div class="row">

      <div class="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center order-lg-2">
        <div class="services-info">
          <h2 class="text-white mb-4">Nueva Seleccion de Donas</h2>
          <p class="text-white">
            Un nuevo stock de Donas con relleno para ofrecer en nuestro menu
          </p>
          <h6 class="text-white mt-4">Juntamos el sabor de las frutas y dulces</h6>
          <p class="text-white">
            Para crear una serie de sabores distintos hechos de manera casera
          </p>
        </div>
      </div>

      <div class="col-lg-6 col-12 order-lg-1">
        <div class="about-text-wrap">
          <img
            src="@/assets/donas.jpg"
            class="about-image img-fluid"
          />
        </div>
      </div>
    </div>
  </div>
</section>
    <section class="artists-section section-padding" id="section_3">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 text-center">
            <h2 class="mb-4">Algunos de nuestros productos</h2>
          </div>
          <div class="col-lg-5 col-12">
            <div class="artists-thumb">
              <div class="artists-image-wrap">
                <img
                  src="@/assets/bagete.jpg"
                  class="artists-image img-fluid"
                />
              </div>
              <div class="artists-hover">
                <<p><strong>Baguette</strong></p>
                <p><strong>Pan </strong>Integral</p>
                <p><strong>Ingredientes</strong> 100% Naturales</p>
                <hr />
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-12">
            <div class="artists-thumb">
              <div class="artists-image-wrap">
                <img
                  src="@/assets/marraqueta.jpg"
                  class="artists-image img-fluid"
                />
              </div>
              <div class="artists-hover">
                <p><strong>Marraqueta</strong></p>
                <p><strong>Tradicional de La Paz </strong></p>
                <p><strong>Ingredientes</strong> 100% Naturales</p>
                <hr />
            </div>
            </div>
            <div class="artists-thumb">
              <img
                src="@/assets/croasant.jpg"
                class="artists-image img-fluid"
              />
              <div class="artists-hover">
                <p><strong>Croasant</strong></p>
                <p><strong>Pan Semi dulce</strong> con queso</p>

                <p><strong>De origen </strong> Franses</p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background-image: url('@/assets/panaderia.jpg');
  background-size: cover; 
  background-position: center;
  background-attachment: fixed; 
  height: 900px; 
  display: flex;
  align-items: center;
  color: #fff;
}


.text-container {
  position: absolute;
  top: 60%; 
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  text-align: center; 
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #fff; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); 
}

.subtitle {
  font-size: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
#section_2 {
  background-image: none; 
  background-color: #fdd17eb2; 
}


</style>