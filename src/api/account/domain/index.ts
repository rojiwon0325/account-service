import { IBaseAggregate } from '@COMMON/interface';

export namespace Account {
  export type Role = 'default' | 'deleted' | 'Normal' | 'Manager' | 'Admin';
  export type AccessTokenPayload = Pick<
    Account,
    'id' | 'role' | 'username' | 'email'
  >;
}

export interface Account extends IBaseAggregate<number> {
  /**
   * 외부 인증 서버 Id
   */
  sub: string;
  /**
   * @format email
   */
  email: string;

  username: string;

  role: Account.Role;
}
