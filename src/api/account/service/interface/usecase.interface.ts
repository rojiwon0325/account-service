import { GoogleProfile } from '@ACCOUNT/google';

export interface IAccountUsecase {
  readonly signIn: (profile: GoogleProfile) => Promise<string>;
  readonly refresh: (
    session: Partial<Pick<GoogleProfile, 'sub'>>,
  ) => Promise<string>;
}
