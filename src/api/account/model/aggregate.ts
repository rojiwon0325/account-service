import { IBaseAggregate } from '@COMMON/interface';
import { ForumPermission } from './permission/forum';

export namespace Account {
  /**
   * 여러 서비스의 권한을 저장한 객체
   */
  export interface Permission {
    forum?: ForumPermission;
  }

  export type AccessTokenPayload = Pick<
    State,
    'id' | 'username' | 'email' | 'role'
  >;

  export interface State extends IBaseAggregate<number> {
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
}
