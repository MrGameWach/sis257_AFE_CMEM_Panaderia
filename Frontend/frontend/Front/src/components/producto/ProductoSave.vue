<script setup lang="ts">
import type { Producto } from '@/models/producto'
import type { Pedido } from '@/models/pedido'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'productos'
const props = defineProps({
    mostrar: Boolean,
    producto: {
        type: Object as () => Producto,
        default: () => ({}) as Producto
    },
    modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const pedidos = ref<Pedido[]>([])

const producto = ref<Producto>({ ...props.producto })

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    }
})

// Watch para cargar datos al editar
watch(
    () => props.producto,
    async (newVal) => {
        producto.value = { ...newVal }
    }
  }
)

async function obtenerPedidos() {
    pedidos.value = await http.get('pedidos').then((response) => response.data)
}


async function handleSave() {
    try {
        const body = {
            idPedido: producto.value.pedido.id,
            nombre: producto.value.nombre,
            precio: producto.value.precio,
            tipo: producto.value.tipo,
            cantidadDisponible: producto.value.cantidadDisponible,
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${producto.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
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
            obtenerPedidos()
            obtenerInterpretes()
        }
    }
)
</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Canción'"
            style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="nombre" class="font-semibold w-4">Nombre</label>
                <InputText id="nombre" v-model="producto.nombre" class="flex-auto" autocomplete="off" autofocus="" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="precio" class="font-semibold w-4">Precio</label>
                <ImputText id="precio" v-model="producto.precio" class="flex-auto" autcomplete="off" autofocus="" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="tipo" class="font-semibold w-4">Tipo</label>
                <InputText id="tipo" v-model="producto.tipo" class="flex-auto" autocomplete="off" autofocus=""/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="cantidadDisponible" class="font-semibold w-4">Cantidad disponible</label>
                <InputText id="cantidadDisponible" v-model="producto.cantidadDisponible" class="flex-auto" autocomplete="off" autofocus=""/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                    @click="dialogVisible = false"></Button>
                <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped></style>
