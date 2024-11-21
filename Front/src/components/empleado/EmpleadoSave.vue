<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'empleados'
const props = defineProps({
  mostrar: Boolean,
  empleado: {
    type: Object as () => Empleado,
    default: () => ({}) as Empleado
  },
  modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])
const date = ref();
const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

const empleado = ref<Empleado>({ ...props.empleado })
watch(
  () => props.empleado,
  (newVal) => {
    empleado.value = { ...newVal }
  }
)

async function handleSave() {
  try {
    const body = {
      nombre: empleado.value.nombre,
      rol: empleado.value.rol,
      fechaContratacion: empleado.value.fechaContratacion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${empleado.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    empleado.value = {} as Empleado
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
        <InputText id="nombre" v-model="empleado.nombre" class="flex-auto" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="rol" class="font-semibold w-4">Rol</label>
        <InputText id="rol" v-model="empleado.rol" class="flex-auto" autocomplete="off" autofocus />
      </div>
      <div class="flex justify-end gap-4 mb-4">
        <label for="fechaContratacion" class="font-semibold w-4">Fecha de Ingreso</label>
        <DatePicker id="fechaContratacion" v-model="empleado.fechaContratacion" class="flex-auto" autocomplete="off" />
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
