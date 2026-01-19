<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { studentService } from '@/services/student.service'
  import { useUiStore } from '@/stores/ui.store'
  import { formatCPFToForm } from '@/utils/formatters'

  const router = useRouter()
  const ui = useUiStore()

  const formRef = ref()
  const loading = ref(false)

  const form = ref({
    name: '',
    email: '',
    cpf: '',
    ra: '',
  })

  function generateRA () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    form.value.ra = Array.from({ length: 6 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('')
  }

  function normalizeCPF (cpf: string) {
    return cpf.replace(/\D/g, '')
  }

  async function submit () {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      loading.value = true

      await studentService.create({
        ...form.value,
        cpf: normalizeCPF(form.value.cpf),
      })

      ui.showSnackbar('Aluno cadastrado com sucesso', 'success')
      router.push('/students')
    } catch (error: any) {
      ui.showSnackbar(
        error.message || 'Erro ao cadastrar aluno',
        'error',
      )
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <v-container class="px-12 pt-12" fluid>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="8" sm="10">
        <v-card elevation="2">
          <v-card-title class="text-h6">
            Cadastrar aluno
          </v-card-title>

          <v-card-subtitle>
            Preencha os dados obrigatórios para cadastrar um novo aluno
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
                v-model="form.cpf"
                counter="14"
                density="comfortable"
                label="CPF"
                :rules="[
                  v => !!v || 'CPF obrigatório',
                ]"
                @input="form.cpf = formatCPFToForm(form.cpf)"
              />

              <v-text-field
                v-model="form.ra"
                append-inner-icon="mdi-refresh"
                density="comfortable"
                hint="Gerado automaticamente"
                label="RA"
                persistent-hint
                readonly
                @click:append-inner="generateRA"
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
                Salvar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
