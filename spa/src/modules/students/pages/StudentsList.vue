<script setup lang="ts">
  import type { IStudent } from '@/types/IStudent'
  import { useTheme } from 'vuetify'
  import { studentService } from '@/services/student.service'
  import StudentsHeader from '../components/StudentsHeader.vue'
  import StudentsPagination from '../components/StudentsPagination.vue'
  import StudentsTable from '../components/StudentsTable.vue'

  const router = useRouter()
  const theme = useTheme()

  const search = ref('')
  const students = ref<IStudent[]>([])
  const page = ref(1)
  const perPage = ref(5)
  const totalPages = ref(1)
  const loading = ref(false)

  let debounceTimer: number | null = null

  function goToCreate () {
    router.push('/students/new')
  }

  function onSearch (value: string) {
    search.value = value
  }

  function onPageChange (value: number) {
    page.value = value
    loadStudents()
  }

  function onPerPageChange (value: number) {
    perPage.value = value
  }

  function onRedirectToEdit (studentId: string) {
    const url = `/students/${studentId}`
    router.push(url)
  }

  watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
      page.value = 1
      loadStudents()
    }, 1000)
  })

  watch(perPage, () => {
    page.value = 1
    loadStudents()
  })

  async function loadStudents () {
    try {
      loading.value = true

      const res = await studentService.search({
        page: page.value,
        perPage: perPage.value,
        q: search.value,
      })

      students.value = res.items
      totalPages.value = res.meta.totalPages
    } catch (error: any) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadStudents()
  })
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>
      Consultar alunos
    </v-toolbar-title>

    <v-switch
      class="mr-4"
      density="compact"
      hide-details
      label="Tema escuro"
      @click="theme.toggle()"
    />
  </v-toolbar>

  <v-container class="px-12 pt-12" fluid>
    <StudentsHeader
      :search="search"
      @create="goToCreate"
      @update:search="onSearch"
    />

    <StudentsTable
      :loading="loading"
      :students="students"
      @edit="onRedirectToEdit($event.id)"
    />

    <StudentsPagination
      :page="page"
      :per-page="perPage"
      :total-pages="totalPages"
      @update:page="onPageChange"
      @update:per-page="onPerPageChange"
    />
  </v-container>
</template>
