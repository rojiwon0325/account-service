import { Account } from '@ACCOUNT/domain';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import TSON from 'typescript-json';

export type GoogleProfile = Pick<Account.State, 'sub' | 'email' | 'username'>;

export const GoogleProfile = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return TSON.assert<GoogleProfile>(ctx.switchToHttp().getRequest().user);
  },
);
