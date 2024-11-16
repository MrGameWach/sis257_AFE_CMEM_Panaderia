<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import type { Pedido } from '@/models/pedido'
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'pedidos'
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
//const interpretes = ref<Interprete[]>([])
const clientes = ref<Cliente[]>([])

//const interprete = ref<Interprete>({} as Interprete)
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
    }
)

async function obtenerEmpleados() {
    empleados.value = await http.get('empleados').then((response) => response.data)
}

async function obtenerClientes() {
    clientes.value = await http.get('clientes').then((response) => response.data)
}


async function handleSave() {
    try {
        const body = {
            idCliente: pedido.value.cliente.id,
            idEmpleado: pedido.value.empleado.id,
            total: pedido.value.total,
            fecha: pedido.value.fecha,
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${pedido.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        pedido.value = {} as Pedido
        dialogVisible.value = false
    } catch (error: any) {
        alert(error?.response?.data?.message)
    }
}

watch(
    () => props.mostrar,
    (nuevoValor) => {
        if (nuevoValor) {
            obtenerEmpleados()
        }
    }
)
</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Canción'"
            style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="fecha" class="font-semibold w-4">Fecha</label>
                <datepicker id="fecha" v-model="pedido.fecha"></datepicker>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="total" class="font-semibold w-4" >Total</label>
                <InputNumber id="total" v-model="pedido.total"></InputNumber>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="empleado" class="font-semibold w-4">Empleado</label>
                <Select id="empleado" v-model="pedido.empleado" optionLabel="nombre" class="flex-auto" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="cliente" class="font-semibold w-4">Cliente</label>
                <InputText id="cliente" v-model="pedido.cliente.nombre" class="flex-auto" autocomplete="off" />
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
