import { Repository } from 'typeorm';
import { Account } from '@ACCOUNT/domain';
import { TypeOrmBaseRepository } from '@COMMON/base';
import { IEntityMapper } from '@COMMON/interface';
import { Inject, Injectable } from '@nestjs/common';
import { AccountEntity } from '../model/account.entity';
import { IAccountRepository } from '../port';
import { AccountEntityMapper } from './account.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from '@COMMON/util';

@Injectable()
export class AccountRepository
  extends TypeOrmBaseRepository<Account.State, AccountEntity>
  implements IAccountRepository
{
  constructor(
    @Inject(AccountEntityMapper)
    mapper: IEntityMapper<Account.State, AccountEntity>,
    @InjectRepository(AccountEntity)
    repository: Repository<AccountEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne(
    where: IAccountRepository.FindOne,
  ): Promise<Account.State | null> {
    return map(
      await this.getRepository().findOne({ where }),
      this.getMapper().toAggregate,
    );
  }
}
