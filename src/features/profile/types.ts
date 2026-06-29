export type UserRole = 'citizen' | 'staff' | 'admin'

export interface Profile {
  id: string
  fullName: string | null
  role: UserRole
  createdAt: string
}
