import { Account } from '@ACCOUNT/domain';
import { IEntityMapper } from '@COMMON/interface';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../model/account.entity';

@Injectable()
export class AccountEntityMapper
  implements IEntityMapper<Account.State, AccountEntity>
{
  toAggregate(entity: AccountEntity): Account.State {
    const { id, sub, username, email } = entity;
    return Account.get({
      id,
      sub,
      username,
      email,
    });
  }

  toRootEntity(aggregate: Account.State): AccountEntity {
    const { id, sub, email, username } = aggregate;
    const entity = new AccountEntity();
    if (id) entity.id = id;
    entity.sub = sub;
    entity.username = username;
    entity.email = email;
    return entity;
  }
}
