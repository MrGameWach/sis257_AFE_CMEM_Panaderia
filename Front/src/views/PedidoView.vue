<script setup lang="ts">
import PedidoList from '@/components/pedido/PedidoList.vue'
import PedidoSave from '@/components/pedido/PedidoSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const pedidoListRef = ref<typeof PedidoList | null>(null)
const pedidoEdit = ref<any>(null)

function hableCreate() {
  pedidoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(pedido: any) {
  pedidoEdit.value = pedido
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  pedidoListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <br><br>
    <h1>Pedidos</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="hableCreate" />
    <PedidoList ref="pedidoListRef" @edit="handleEdit" />
    <PedidoSave
      :mostrar="mostrarDialog"
      :pedido="pedidoEdit"
      :modoEdicion="!!pedidoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
