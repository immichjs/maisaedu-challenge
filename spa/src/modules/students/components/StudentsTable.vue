<script setup lang="ts">
  import type { IStudent } from '@/types/IStudent'

  defineProps<{
    students: IStudent[]
    loading: boolean
  }>()

  const emit = defineEmits<{
    (e: 'edit' | 'delete', student: IStudent): void
  }>()
</script>

<template>
  <v-data-table
    hide-default-footer
    item-key="id"
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
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            @click="emit('edit', item)"
          />
          <v-btn
            color="error"
            icon="mdi-delete"
            size="small"
            variant="text"
            @click="emit('delete', item)"
          />
        </td>
      </tr>
    </template>

    <template #no-data>
      <span class="text-center pa-4">
        Nenhum aluno encontrado
      </span>
    </template>

  </v-data-table>
</template>
