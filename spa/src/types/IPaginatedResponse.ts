import type { IPaginationMeta } from './IPaginationMeta'

export interface IPaginatedResponse<T> {
  items: T[]
  meta: IPaginationMeta
}
