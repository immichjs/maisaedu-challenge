<script setup lang="ts">
  import type { IStudent } from '@/types/IStudent'

  defineProps<{
    student: IStudent
  }>()

  const emit = defineEmits<{
    (e: 'edit' | 'delete', student: IStudent): void
  }>()
</script>

<template>
  <v-speed-dial location="start top" transition="fade-transition">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        density="compact"
        icon="mdi-dots-vertical"
        variant="text"
      />
    </template>

    <v-btn
      key="edit"
      size="small"
      @click="emit('edit', student)"
    >
      Editar
    </v-btn>

    <v-btn
      key="delete"
      color="error"
      size="small"
      @click="emit('delete', student)"
    >
      Excluir
    </v-btn>
  </v-speed-dial>
</template>
