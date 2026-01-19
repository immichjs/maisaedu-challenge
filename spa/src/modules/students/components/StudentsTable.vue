<script setup lang="ts">
  import type { IStudent } from '@/types/IStudent'
  import StudentActions from './StudentActions.vue'

  defineProps<{
    students: IStudent[]
    loading: boolean
  }>()

  const emit = defineEmits<{
    (e: 'edit' | 'delete', student: IStudent): void
  }>()

  const headers = [
    { title: 'Nome', key: 'name' },
    { title: 'E-mail', key: 'email' },
    { title: 'RA', key: 'ra' },
    { title: 'CPF', key: 'cpf' },
    { title: 'Ações', key: 'actions' },
  ]
</script>

<template>
  <v-data-table
    :headers="headers"
    hide-default-footer
    :items="students"
    :loading="loading"
  >
    <template #headers>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>RA</th>
        <th>CPF</th>
        <th class="text-center">Ações</th>
      </tr>
    </template>

    <template #item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.ra }}</td>
        <td>{{ item.cpf }}</td>
        <td class="text-center">
          <StudentActions
            :student="item"
            @delete="emit('delete', $event)"
            @edit="emit('edit', $event)"
          />
        </td>
      </tr>
    </template>

    <template #no-data>
      <div class="text-center pa-4 w-100">
        Nenhum aluno encontrado
      </div>
    </template>

  </v-data-table>
</template>
