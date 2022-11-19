import { GoogleProfile } from '@ACCOUNT/google';
import { map_access_token_payload } from '@ACCOUNT/util';
import { HttpExceptionFactory } from '@COMMON/exception';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAccountService, IAccountUsecase } from '../application/port';
import { AccountService } from './account.service';

@Injectable()
export class AccountUsecase implements IAccountUsecase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: IAccountService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    profile: GoogleProfile,
  ): Promise<IAccountUsecase.SignInResponse> {
    const account = await this.accountService.findOneOrCreate(profile);
    const access_token = this.jwtService.sign(
      map_access_token_payload(account),
    );
    // refresh_token 생성 로직 추가
    // session에 sub, ... 기록
    return { refresh_token: '', access_token };
  }

  async signOut(profile: GoogleProfile): Promise<void> {
    // refresh_token 비활성화 진행
    return;
  }

  async refresh({
    sub,
  }: GoogleProfile): Promise<IAccountUsecase.RefreshResponse> {
    const account = await this.accountService.findOne({ sub });
    if (account == null || account.role === 'deleted') {
      throw HttpExceptionFactory('UnAuthorized', '잘못된 인증 정보입니다.');
    }
    const access_token = this.jwtService.sign(
      map_access_token_payload(account),
    );
    // refresh
    return { access_token };
  }
}
