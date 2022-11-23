import { GoogleProfile } from '@ACCOUNT/google';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { IAccountService, IAccountUsecase } from '../port';
import { Account } from '@ACCOUNT/domain';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';

@Injectable()
export class AccountUsecase implements IAccountUsecase {
  constructor(
    @Inject(AccountService)
    private readonly service: IAccountService,
    @Inject(AccountRepository)
    private readonly repository: IAccountRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    profile: GoogleProfile,
  ): Promise<IAccountUsecase.SignInResponse> {
    const account = await this.service.findOneOrCreate(profile);
    const access_token = this.jwtService.sign(
      Account.getAccessTokenPayload(account),
    );
    return { access_token, account_id: account.id };
  }

  async refresh({ id }: Partial<Pick<Account.State, 'id'>>): Promise<string> {
    const account = await this.service.findOne({ id });

    return this.jwtService.sign(Account.getAccessTokenPayload(account));
  }

  async withdraw({ id }: Partial<Pick<Account.State, 'id'>>): Promise<void> {
    const account = await this.service.findOne({ id });
    await this.repository.remove({ id: account.id });
    return;
  }
}
