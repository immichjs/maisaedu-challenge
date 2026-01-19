<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { studentService } from '@/services/student.service'
  import { useUiStore } from '@/stores/ui.store'
  import { formatCPF, formatCPFToForm } from '@/utils/formatters'

  const route = useRoute('/students/[id]')
  const router = useRouter()
  const ui = useUiStore()

  const studentId = route.params.id as string

  const formRef = ref()
  const loading = ref(false)

  const form = ref({
    name: '',
    email: '',
    cpf: '',
    ra: '',
  })

  async function loadStudent () {
    try {
      loading.value = true

      const student = await studentService.findById(studentId)

      form.value = {
        name: student.name,
        email: student.email,
        cpf: formatCPF(student.cpf),
        ra: student.ra,
      }
    } catch (error: any) {
      ui.showSnackbar(
        error.message || 'Erro ao carregar aluno',
        'error',
      )
      router.push('/students')
    } finally {
      loading.value = false
    }
  }

  async function submit () {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      loading.value = true

      await studentService.update(studentId, {
        name: form.value.name,
        email: form.value.email,
      })

      ui.showSnackbar('Aluno atualizado com sucesso', 'success')
      router.push('/students')
    } catch (error: any) {
      ui.showSnackbar(
        error.message || 'Erro ao atualizar aluno',
        'error',
      )
    } finally {
      loading.value = false
    }
  }

  onMounted(loadStudent)
</script>

<template>
  <v-container class="px-12 pt-12" fluid>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="8" sm="10">
        <v-card elevation="2">
          <v-card-title class="text-h6">
            Editar aluno
          </v-card-title>

          <v-card-subtitle>
            Atualize os dados cadastrais do aluno
          </v-card-subtitle>

          <v-divider class="my-4" />

          <v-form ref="formRef">
            <v-card-text class="pt-0">
              <v-text-field
                v-model="form.name"
                density="comfortable"
                label="Nome completo"
                :rules="[v => !!v || 'Nome obrigatório']"
              />

              <v-text-field
                v-model="form.email"
                density="comfortable"
                label="E-mail"
                :rules="[v => /.+@.+\..+/.test(v) || 'E-mail inválido']"
                type="email"
              />

              <v-text-field
                density="comfortable"
                disabled
                label="CPF"
                :model-value="formatCPFToForm(form.cpf)"
              />

              <v-text-field
                v-model="form.ra"
                density="comfortable"
                disabled
                label="RA"
              />
            </v-card-text>

            <v-card-actions class="justify-end px-6 pb-6">
              <v-btn
                variant="text"
                @click="router.push('/students')"
              >
                Cancelar
              </v-btn>

              <v-btn
                color="primary"
                :loading="loading"
                @click="submit"
              >
                Salvar alterações
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
