<script setup lang="ts">
import type { Proveedor } from '@/models/proveedor'
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'proveedores'
const props = defineProps({
    mostrar: Boolean,
    proveedor: {
        type: Object as () => Proveedor,
        default: () => ({}) as Proveedor
    },
    modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const productos = ref<Producto[]>([])

const producto = ref<Producto>({} as Producto)
const proveedor = ref<Proveedor>({ ...props.proveedor })

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    }
})

// Watch para cargar datos al editar
watch(
    () => props.proveedor,
    async (newVal) => {
        proveedor.value = { ...newVal }
        producto.value=proveedor.value.producto;
        if(producto.value?.id)
        await obtenerProductos()
    }
)

async function obtenerProductos() {
    productos.value = await http.get('productos').then((response) => response.data)
}


async function handleSave() {
    try {
        const body = {
            idProducto: proveedor.value.producto.id,
            nombre: proveedor.value.nombre,
            telefono: proveedor.value.telefono,
            direccion: proveedor.value.direccion
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${proveedor.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        proveedor.value = {} as Proveedor
        dialogVisible.value = false
    } catch (error: any) {
        alert(error?.response?.data?.message)
    }
}

watch(
    () => props.mostrar,
    (nuevoValor) => {
        if (nuevoValor) {
            obtenerProductos()
        }
    }
)
</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Canción'"
            style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="producto" class="font-semibold w-4">Nombre producto</label>
                <InputText id="producto" v-model="proveedor.producto.nombre" class="flex-auto" autocomplete="off"
                    autofocus="" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="nombre" class="font-semibold w-4">Nombre</label>
                <ImputText id="nombre" v-model="proveedor.nombre" class="flex-auto" autcomplete="off" autofocus="" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="telefono" class="font-semibold w-4">Telefono</label>
                <ImputText id="telefono" v-model="proveedor.telefono" class="flex-auto" autcomplete="off"
                    autofocus="" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="direccion" class="font-semibold w-4">Direccion</label>
                <InputText id="direccion" v-model="proveedor.direccion" class="flex-auto" autocomplete="off"
                    autofocus="" />
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
