import { Account } from '@ACCOUNT/domain';
import { GoogleProfile } from '@ACCOUNT/google/google-profile';

export interface IAccountService {
  readonly findOne: (
    filter: Partial<Pick<Account.State, 'id'>>,
  ) => Promise<Account.State>;
  readonly findOneOrCreate: (profile: GoogleProfile) => Promise<Account.State>;
}
