import { Account } from '@ACCOUNT/domain';
import { GoogleProfile } from '@ACCOUNT/google';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port';
import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../port';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject(AccountRepository)
    private readonly repository: IAccountRepository,
  ) {}

  async findOne({
    id,
  }: Partial<Pick<Account.State, 'id'>>): Promise<Account.State> {
    const exception = HttpExceptionFactory('UnAuthorized');

    return throw_if_null(
      await this.repository.findOne({ id: throw_if_null(id, exception) }),
      exception,
    );
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
