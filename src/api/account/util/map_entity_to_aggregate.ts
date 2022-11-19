import { Account } from '@ACCOUNT/model/aggregate';
import { AccountEntity } from '@ACCOUNT/model/account.entity';

export const map_entity_to_aggregate = (entity: AccountEntity): Account =>
  entity;
