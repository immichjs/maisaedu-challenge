<script setup lang="ts">
  defineProps<{
    search: string
  }>()

  defineEmits(['update:search', 'create'])
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <v-text-field
      clearable
      density="compact"
      label="Buscar por aluno"
      max-width="512"
      :model-value="search"
      @update:model-value="$emit('update:search', $event)"
    />

    <v-btn color="primary" @click="$emit('create')">
      + Adicionar
    </v-btn>
  </div>
</template>
