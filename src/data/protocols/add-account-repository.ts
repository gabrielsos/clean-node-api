import { AddAccountModel } from '../../domain/usecases/addAccount'
import { AccountModel } from '../../domain/models/Account'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
