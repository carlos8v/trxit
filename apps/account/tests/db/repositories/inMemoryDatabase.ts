import { AccountModel } from '@domain/Account'
import { WalletModel } from '@domain/Wallet'

export type InMemoryDatabase = {
  walletsData: Map<string, WalletModel>
  accountsData: Map<string, AccountModel>

  getByField: <T>(database: Map<string, T>, field: keyof T) => Map<T[keyof T], T>
  truncate: () => void
}

export const inMemoryDatabaseFactory = (): InMemoryDatabase => {
  const walletsData = new Map<string, WalletModel>()
  const accountsData = new Map<string, AccountModel>()

  const truncate = () => {
    walletsData.clear()
    accountsData.clear()
  }
  
  const getByField = <T>(database: Map<string, T>, field: keyof T): Map<T[keyof T], T> => {
    const mapByField = new Map([...database.values()].map((row) => [row[field], row]))
    return mapByField
  }

  return {
    walletsData,
    accountsData,

    getByField,
    truncate
  }
}
