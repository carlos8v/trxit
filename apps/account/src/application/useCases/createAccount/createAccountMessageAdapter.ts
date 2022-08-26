import {
  CreateAccountData,
  CreateAccountMessageAdapter,
  CreateAccountMessageAdapterFactory
} from './createAccountDTO';

export const createAccountMessageAdapterFactory = ({ createAccountUseCase }: CreateAccountMessageAdapterFactory) => {
  const createAccountMessageAdapter: CreateAccountMessageAdapter = async (individualJSON) => {
    let individual: CreateAccountData

    try {
      individual = JSON.parse(individualJSON)
    } catch (error) {
      throw new Error('Credenciais de indivíduo inválidas')
    }

    await createAccountUseCase(individual)
  }

  return createAccountMessageAdapter
}
