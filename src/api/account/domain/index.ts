import { IBaseAggregate } from '@COMMON/interface';
import { ForumPermission } from './permission/forum';

export namespace Account {
  export type Id = number;

  /**
   * 여러 서비스의 권한을 저장한 객체
   */
  export interface Permission {
    forum: ForumPermission | 'None';
  }

  export interface State extends IBaseAggregate<Id> {
    /**
     * 외부 인증 서버 Id
     */
    readonly sub: string;
    /**
     * @format email
     */
    readonly email: string;

    readonly username: string;

    readonly role: Permission;
  }

  export type AccessTokenPayload = Pick<
    State,
    'id' | 'username' | 'email' | 'role'
  >;
}

type Required = keyof Pick<Account.State, 'sub' | 'email' | 'username'>;

type Props = Pick<Account.State, Required> &
  Partial<Omit<Account.State, Required>>;

export interface Account {
  readonly get: (args: Props) => Account.State;
  readonly getAccessTokenPayload: (
    agg: Account.State,
  ) => Account.AccessTokenPayload;
}

export const Account: Account = {
  get(args) {
    throw new Error('Function not implemented.');
  },
  getAccessTokenPayload(agg) {
    throw new Error('Function not implemented.');
  },
};
