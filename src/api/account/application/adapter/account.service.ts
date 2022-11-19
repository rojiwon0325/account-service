import { Account } from '@ACCOUNT/domain';
import { GoogleProfile } from '@ACCOUNT/google';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port';
import { HttpExceptionFactory } from '@COMMON/exception';
import { Injectable } from '@nestjs/common';
import { IAccountService } from '../port';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly repository: IAccountRepository) {}

  async findOne({
    id,
  }: Partial<Pick<Account.State, 'id'>>): Promise<Account.State> {
    if (id == undefined) {
      throw HttpExceptionFactory('UnAuthorized');
    }
    const account = await this.repository.findOne({ id });
    if (account == null) {
      throw HttpExceptionFactory('UnAuthorized');
    }
    return account;
  }

  async findOneOrCreate({
    sub,
    username,
    email,
  }: GoogleProfile): Promise<Account.State> {
    return (
      (await this.repository.findOne({ sub })) ??
      (await this.repository.save(Account.get({ sub, username, email })))
    );
  }
}
