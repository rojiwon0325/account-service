import { Account } from '@ACCOUNT/domain';
import { GoogleProfile } from '@ACCOUNT/google/google-profile';

export interface IAccountService {
  readonly findOne: (filter: Pick<Account, 'sub'>) => Promise<Account | null>;
  readonly findOneOrCreate: (profile: GoogleProfile) => Promise<Account>;
}
