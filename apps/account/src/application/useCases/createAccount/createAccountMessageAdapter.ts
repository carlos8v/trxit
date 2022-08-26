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
      throw new Error('Invalid individual credentials')
    }

    await createAccountUseCase(individual)
  }

  return createAccountMessageAdapter
}
