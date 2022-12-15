import { IBaseAggregate } from '@COMMON/interface';

export namespace Account {
  export type Id = number;

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
  }

  export type AccessTokenPayload = Pick<State, 'id' | 'username' | 'email'>;
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
    const now = new Date();
    const {
      id = 0,
      created_at = now,
      updated_at = now,
      sub,
      email,
      username,
    } = args;
    return {
      id,
      created_at,
      updated_at,
      sub,
      email,
      username,
    };
  },
  getAccessTokenPayload(agg) {
    const { id, username, email } = agg;
    return { id, username, email };
  },
};
