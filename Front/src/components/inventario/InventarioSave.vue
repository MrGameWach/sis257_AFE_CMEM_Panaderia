<script setup lang="ts">
import type { Inventario } from '@/models/inventario'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'inventarios'
const props = defineProps({
    mostrar: Boolean,
    inventario: {
        type: Object as () => Inventario,
        default: () => ({}) as Inventario
    },
    modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    }
})

const inventario = ref<Inventario>({ ...props.inventario })
watch(
    () => props.inventario,
    (newVal) => {
        inventario.value = { ...newVal }
    }
)

async function handleSave() {
    try {
        const body = {
            nombre: inventario.value.nombre,
            cantidad: inventario.value.cantidad,
            fechaActualizacion: inventario.value.fechaActualizacion
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${inventario.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        inventario.value = {} as Inventario
        dialogVisible.value = false
    } catch (error: any) {
        alert(error?.response?.data?.message)
    }
}
</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="nombre" class="font-semibold w-4">Nombre</label>
                <InputText id="nombre" v-model="inventario.nombre" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="cantidad" class="font-semibold w-4">Cantidad</label>
                <InputNumber id="cantidad" v-model="inventario.cantidad" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex justify-end gap-4 mb-4">
                <label for="fechaActualizacion" class="font-semibold w-4">Fecha de Actualizacion</label>
                <DatePicker id="fechaActualizacion" v-model="inventario.fechaActualizacion" class="flex-auto"
                    autocomplete="off" />
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
