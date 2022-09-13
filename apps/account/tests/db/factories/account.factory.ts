import { randomUUID } from 'crypto'

import { faker } from '@faker-js/faker/locale/pt_BR'
import fakerBr from '@tests/lib/faker-br'

import { Account, AccountStatus } from '@domain/Account'

export const accountFactory = (status: AccountStatus = 'ACTIVE') => {
  const name = faker.name.fullName()
  const nameArr = name.split(' ')
  const username = `${nameArr[0].toLowerCase()}.${nameArr.pop()?.toLowerCase()}`

  return Account({
    name,
    ownerId: randomUUID(),
    status,
    username,
    document: fakerBr.cpf({ format: false }),
  })
}
