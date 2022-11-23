import { Account } from '@ACCOUNT/domain';
import { GoogleProfile } from '@ACCOUNT/google';

export namespace IAccountUsecase {
  export interface SignInResponse {
    access_token: string;
    account_id: Account.Id;
  }
}

export interface IAccountUsecase {
  readonly signIn: (
    profile: GoogleProfile,
  ) => Promise<IAccountUsecase.SignInResponse>;
  readonly refresh: (
    account: Partial<Pick<Account.State, 'id'>>,
  ) => Promise<string>;
  readonly withdraw: (
    account: Partial<Pick<Account.State, 'id'>>,
  ) => Promise<void>;
}
