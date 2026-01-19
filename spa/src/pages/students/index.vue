<script setup lang="ts">
  import StudentsList from '@/modules/students/pages/StudentsList.vue'

  definePage({
    meta: {
      title: 'Consultar alunos',
    },
  })
</script>

<template>
  <StudentsList />
</template>
