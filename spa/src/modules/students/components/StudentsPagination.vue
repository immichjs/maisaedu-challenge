<script setup lang="ts">
  defineProps<{
    page: number
    perPage?: number
    totalPages?: number
  }>()

  defineEmits(['update:page', 'update:perPage'])

  const perPageItems = ref([1, 5, 10, 50])
  const totalVisible = ref(5)
</script>

<template>
  <div class="d-flex justify-space-between mt-4">
    <v-combobox
      :items="perPageItems"
      label="Registros por página"
      max-width="192"
      :model-value="perPage"
      @update:model-value="$emit('update:perPage', $event)"
    />

    <v-pagination
      :length="totalPages"
      :model-value="page"
      :total-visible="totalVisible"
      @update:model-value="$emit('update:page', $event)"
    />
  </div>
</template>
