import {
  CreateAccountData,
  CreateAccountController,
  CreateAccountControllerFactory
} from './createAccountDTO';

export const createAccountControllerFactory = ({ createAccountUseCase }: CreateAccountControllerFactory) => {
  const createAccountController: CreateAccountController = async (individualJSON) => {
    const individual: CreateAccountData = JSON.parse(individualJSON)
    await createAccountUseCase(individual)
  }

  return createAccountController
}
