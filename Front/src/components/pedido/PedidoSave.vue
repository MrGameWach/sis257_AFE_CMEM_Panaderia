<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import type { Pedido } from '@/models/pedido'
import type { Empleado } from '@/models/empleado'
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'pedidoes'
const props = defineProps({
  mostrar: Boolean,
  pedido: {
    type: Object as () => Pedido,
    default: () => ({}) as Pedido
  },
  modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const empleados = ref<Empleado[]>([])
const productos = ref<Producto[]>([])
const clientes = ref<Cliente[]>([])

const producto = ref<Producto>({} as Producto)
const pedido = ref<Pedido>({ ...props.pedido })

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

// Watch para cargar datos al editar
watch(
  () => props.pedido,
  async (newVal) => {
    pedido.value = { ...newVal }
    
    // interprete.value = cancion.value?.album?.interprete ?? ({} as Interprete)
    // if (interprete.value?.id) {
    //   await obtenerAlbumes()
    //   cancion.value.album =
    //     albumes.value.find((album) => album.id === cancion.value.album.id) || ({} as Album)
    // }
  }
)

async function obtenerEmpleados() {
  empleados.value = await http.get('empleados').then((response) => response.data)
}

async function obtenerProductos() {
  productos.value = await http.get('productos').then((response) => response.data)
}

async function obtenerClientes() {
  clientes.value = await http.get('clientes').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {      
      fecha: pedido.value.fecha,
      total: pedido.value.total,
      idCliente: pedido.value.cliente.id,
      idEmpleado: pedido.value.empleado.id,
      idProducto: pedido.value.producto.id,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${pedido.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    pedido.value = {} as Pedido
    producto.value = {} as Producto
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerClientes()
      obtenerEmpleados()
      obtenerProductos()
    }
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Pedido'"
      style="width: 25rem"
    >
    <div class="flex items-center gap-4 mb-4">
        <label for="cliente" class="font-semibold w-4">Cliente</label>
        <Select
          id="cliente"
          v-model="pedido.cliente"
          :options="clientes"
          optionLabel="nombre"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="producto" class="font-semibold w-4">Producto</label>
        <Select
          id="producto"
          v-model="pedido.producto"
          :options="productos"
          optionLabel="nombre"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="empleado" class="font-semibold w-4">Empleado</label>
        <Select
          id="empleado"
          v-model="pedido.empleado"
          :options="empleados"
          optionLabel="nombre"
          class="flex-auto"
        />
      </div>
      <div class="flex justify-end gap-4 mb-4">
        <label for="fechaContratacion" class="font-semibold w-4">Fecha</label>
        <DatePicker id="fecha" v-model="pedido.fecha" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-4 mb-4">
        <label for="total" class="font-semibold w-4">Total</label>
        <InputNumber id="total" v-model="pedido.total" class="flex-auto" autocomplete="off"/>
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
