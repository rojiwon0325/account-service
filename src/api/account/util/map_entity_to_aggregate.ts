import { Account } from '@ACCOUNT/domain';
import { AccountEntity } from '@ACCOUNT/infrastructure/model/account.entity';

export const map_entity_to_aggregate = (entity: AccountEntity): Account =>
  entity;
