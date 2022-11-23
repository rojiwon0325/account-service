import { Account } from '@ACCOUNT/domain';
import { IEntityMapper } from '@COMMON/interface';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../model/account.entity';
import { mapForumPermission } from './permission-forum.mapper';

@Injectable()
export class AccountEntityMapper
  implements IEntityMapper<Account.State, AccountEntity>
{
  toAggregate(entity: AccountEntity): Account.State {
    const { id, sub, username, email, permission_forum } = entity;
    return Account.get({
      id,
      sub,
      username,
      email,
      role: { forum: permission_forum?.permission ?? 'None' },
    });
  }

  toRootEntity(aggregate: Account.State): AccountEntity {
    const {
      id,
      sub,
      email,
      username,
      role: { forum },
    } = aggregate;
    const entity = new AccountEntity();
    if (id) entity.id = id;
    entity.sub = sub;
    entity.username = username;
    entity.email = email;
    entity.permission_forum = mapForumPermission(id, forum);
    return entity;
  }
}
