import { Account } from '@ACCOUNT/domain';
import { IBaseRepository } from '@COMMON/interface';

export namespace IAccountRepository {
  export type FindOne = Pick<Account.State, 'id'> | Pick<Account.State, 'sub'>;
}

export interface IAccountRepository
  extends IBaseRepository<Account.Id, Account.State> {
  readonly findOne: (
    filter: IAccountRepository.FindOne,
  ) => Promise<Account.State | null>;
}
