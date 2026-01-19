import type { IPaginatedResponse } from '@/types/IPaginatedResponse'
import type { IStudent } from '@/types/IStudent'
import { api } from './api'

export interface GetStudentsParams {
  page: number
  perPage?: number
  q?: string
}

export const studentService = {
  async search (params: GetStudentsParams) {
    const { data } = await api.get<IPaginatedResponse<IStudent>>('/students', {
      params,
    })

    return data
  },

  async findById (id: string) {
    const { data } = await api.get<IStudent>(`/students/${id}`)
    return data
  },

  async create (payload: Omit<IStudent, 'id'>) {
    const { data } = await api.post<IStudent>('/students', payload)
    return data
  },

  async update (id: string, payload: Partial<IStudent>) {
    const { data } = await api.put<IStudent>(`/students/${id}`, payload)
    return data
  },

  async delete (id: string) {
    await api.delete(`/students/${id}`)
  },
}
