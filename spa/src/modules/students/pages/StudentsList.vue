<script setup lang="ts">
  import type { IStudent } from '@/types/IStudent'
  import { studentService } from '@/services/student.service'
  import { useUiStore } from '@/stores/ui.store'
  import StudentDeleteDialog from '../components/StudentDeleteDialog.vue'
  import StudentsHeader from '../components/StudentsHeader.vue'
  import StudentsPagination from '../components/StudentsPagination.vue'
  import StudentsTable from '../components/StudentsTable.vue'

  const router = useRouter()
  const uiStore = useUiStore()

  const search = ref('')
  const students = ref<IStudent[]>([])
  const page = ref(1)
  const perPage = ref(5)
  const totalPages = ref(1)
  const loading = ref(false)
  const showDeleteDialog = ref(false)
  const studentToDelete = ref<IStudent>()
  const deleting = ref(false)

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

  function onDeleteStudent (student: IStudent) {
    studentToDelete.value = student
    showDeleteDialog.value = true
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

  async function confirmDelete () {
    if (!studentToDelete.value) return

    try {
      deleting.value = true

      await studentService.delete(studentToDelete.value.id)

      uiStore.showSnackbar('Aluno removido com sucesso', 'success')

      showDeleteDialog.value = false
      loadStudents()
    } catch (error: any) {
      uiStore.showSnackbar(
        error.message || 'Erro ao remover aluno',
        'error',
      )
    } finally {
      deleting.value = false
    }
  }

  onMounted(() => {
    loadStudents()
  })
</script>

<template>
  <v-container class="px-12 pt-12" fluid>
    <StudentsHeader
      :search="search"
      @create="goToCreate"
      @update:search="onSearch"
    />

    <StudentsTable
      :loading="loading"
      :students="students"
      @delete="onDeleteStudent"
      @edit="onRedirectToEdit($event.id)"
    />

    <StudentDeleteDialog
      v-model="showDeleteDialog"
      :loading="deleting"
      :student="studentToDelete"
      @confirm="confirmDelete"
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
