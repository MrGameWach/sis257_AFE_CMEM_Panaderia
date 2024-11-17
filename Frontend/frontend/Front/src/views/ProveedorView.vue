<script setup lang="ts">
import ProveedorList from '@/components/Proveedor/ProveedorList.vue';
import ProveedorSave from '@/components/Proveedor/proveedorSave.vue';
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const proveedorListRef = ref<typeof ProveedorList | null>(null)
const proveedorEdit = ref<any>(null)

function hableCreate() {
  proveedorEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(proveedor: any) {
  proveedorEdit.value = proveedor
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  proveedorListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Proveedores</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="hableCreate" />
    <ProveedorList ref="proveedorListRef" @edit="handleEdit" />
    <ProveedorSave
      :mostrar="mostrarDialog"
      :proveedor="proveedorEdit"
      :modoEdicion="!!proveedorEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
