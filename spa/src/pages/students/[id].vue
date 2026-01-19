<script setup lang="ts">
  const route = useRoute('/students/[id]')
  const studentId = computed(() => route.params.id)
</script>

<template>
  {{ studentId }}
</template>
