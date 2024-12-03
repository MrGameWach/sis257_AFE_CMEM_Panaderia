<script setup lang="ts">
import type { Pedido } from '@/models/pedido'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'pedidos'
let pedidos = ref<Pedido[]>([])
const emit = defineEmits(['edit'])
const pedidoDelete = ref<Pedido | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  pedidos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(pedido: Pedido) {
  emit('edit', pedido)
}

function mostrarEliminarConfirm(pedido: Pedido) {
  pedidoDelete.value = pedido
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${pedidoDelete.value?.id}`)
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
          <th>Fecha</th>
          <th>Total</th>
          <th>Cliente</th>
          <th>Empleado</th>
          <th>Producto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pedido, index) in pedidos" :key="pedido.id">
          <td>{{ index + 1 }}</td>
          <td>{{ pedido.fecha }}</td>
          <td>{{ pedido.total }}</td>
          <td>{{ pedido.cliente.nombre }}</td>
          <td>{{ pedido.empleado.nombre }}</td>
          <td>{{ pedido.producto.nombre }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(pedido)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(pedido)"
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
