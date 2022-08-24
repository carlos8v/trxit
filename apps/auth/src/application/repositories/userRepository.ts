import { UserModel } from '@domain/User'

export interface UserRepository {
  create(userData: UserModel): Promise<void>
  findByCPF(cpf: string): Promise<UserModel | null>
  findById(id: string): Promise<UserModel | null>
}
