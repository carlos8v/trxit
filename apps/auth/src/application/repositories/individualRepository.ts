import { IndividualModel } from '@domain/Individual'

export interface IndividualRepository {
  create(individualData: IndividualModel): Promise<void>
  findByCPF(cpf: string): Promise<IndividualModel | null>
  findById(id: string): Promise<IndividualModel | null>
}
