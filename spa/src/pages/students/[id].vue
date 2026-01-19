<script setup lang="ts">
  const route = useRoute('/students/[id]')
  const studentId = computed(() => route.params.id)

  definePage({
    meta: {
      title: 'Editar aluno',
    },
  })
</script>

<template>
  {{ studentId }}
</template>
