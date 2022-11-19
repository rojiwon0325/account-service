import { Account } from '@ACCOUNT/model/aggregate';
import { GoogleProfile } from '@ACCOUNT/google/google-profile';

export interface IAccountService {
  readonly findOne: (
    filter: Pick<Account.State, 'sub'>,
  ) => Promise<Account.State | null>;
  readonly findOneOrCreate: (profile: GoogleProfile) => Promise<Account.State>;
}
