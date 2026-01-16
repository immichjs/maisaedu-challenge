import type { IStudent } from '@/types/Student'

export const useStudentStore = defineStore('students', {
  state: () => ({
    students: [] as IStudent[],
    loading: false,
  }),

  actions: {
    async fetchAll () {},
    async create (student) {},
    async update (id, student) {},
    async remove (id) {},
  },
})
