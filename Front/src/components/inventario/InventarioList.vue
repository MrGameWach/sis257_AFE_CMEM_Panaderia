<script setup lang="ts">
import type { Inventario } from '@/models/inventario'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'inventarios'
let inventarios = ref<Inventario[]>([])
const emit = defineEmits(['edit'])
const inventarioDelete = ref<Inventario | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  inventarios.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(inventario: Inventario) {
  emit('edit', inventario)
}

function mostrarEliminarConfirm(inventario: Inventario) {
  inventarioDelete.value = inventario
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${inventarioDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>fecha de actualizacion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(inventario, index) in inventarios" :key="inventario.id">
          <td>{{ index + 1 }}</td>
          <td>{{ inventario.nombre }}</td>
          <td>{{ inventario.cantidad }}</td>
          <td>{{ inventario.fechaActualizacion }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(inventario)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(inventario)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
