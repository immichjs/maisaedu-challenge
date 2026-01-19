<script setup lang="ts">
  import type { IStudent } from '@/types/IStudent'

  defineProps<{
    modelValue: boolean
    student?: IStudent
    loading: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm'): void
  }>()
</script>

<template>
  <v-dialog max-width="420" :model-value="modelValue" persistent>
    <v-card>
      <v-card-title>Remover aluno</v-card-title>

      <v-card-text>
        Tem certeza que deseja remover
        <strong>{{ student?.name }}</strong>?
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          variant="text"
          @click="emit('update:modelValue', false)"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="error"
          :loading="loading"
          @click="emit('confirm')"
        >
          Remover
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
