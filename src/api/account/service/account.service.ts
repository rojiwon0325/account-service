import { Account } from '@ACCOUNT/model/aggregate';
import { GoogleProfile } from '@ACCOUNT/google';
import { AccountEntity } from '@ACCOUNT/model/account.entity';
import { map_entity_to_aggregate } from '@ACCOUNT/util';
import { map } from '@COMMON/util';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAccountService } from '../application/port';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>,
  ) {}

  async findOne({ sub }: Pick<Account, 'sub'>): Promise<Account | null> {
    return map(
      await this.repository.findOne({ where: { sub } }),
      map_entity_to_aggregate,
    );
  }

  async findOneOrCreate({
    sub,
    username,
    email,
  }: GoogleProfile): Promise<Account> {
    const account =
      (await this.findOne({ sub })) ??
      (await this.create({ sub, username, email }));
    return map_entity_to_aggregate(account);
  }

  private async create({
    sub,
    username,
    email,
  }: GoogleProfile): Promise<Account> {
    const entity = new AccountEntity();
    entity.sub = sub;
    entity.username = username;
    entity.email = email;
    const account = await this.repository.save(entity);
    return account;
  }
}
