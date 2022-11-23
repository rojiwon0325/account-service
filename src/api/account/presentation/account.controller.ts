import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GoogleProfile } from '../google/google-profile';
import { Session as ISession } from 'express-session';
import { IAccountUsecase } from '@ACCOUNT/application/port';
import { Account } from '@ACCOUNT/domain';
import { AccountUsecase } from '@ACCOUNT/application/adapter';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@ACCOUNT/cookie';

@Controller()
export class AccountController {
  constructor(
    @Inject(AccountUsecase)
    private readonly accountUsecase: IAccountUsecase,
  ) {}

  /**
   * 구글 인증 서버를 통한 로그인 API
   */
  @Get('sign-in')
  @UseGuards(AuthGuard('google'))
  signIn() {
    // redirect account.google.com
    return;
  }

  /**
   * 로그인 인증 성공시 redirect되는 경로. 인증 성공시 세션을 생성하고 access token과 함께 쿠키에 추가됩니다.
   * @param profile 구글 인증을 통해 얻은 프로필 데이터입니다.
   * @returns 로그인 API 요청시 생성된 토큰 정보를 포함합니다.
   */
  @Get('oauth/callback')
  @UseGuards(AuthGuard('google'))
  async callback(
    @Session()
    session: ISession & Partial<Record<'account', Pick<Account.State, 'id'>>>,
    @GoogleProfile() profile: GoogleProfile,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ refresh_token: ISession['id']; access_token: string }> {
    const { access_token, account_id } = await this.accountUsecase.signIn(
      profile,
    );
    session.account = { id: account_id };
    res.cookie(ACCESS_TOKEN, access_token, { httpOnly: true });
    return {
      refresh_token: session.id,
      access_token,
    };
  }

  /**
   * 로그 아웃 API
   * 세션을 제거하고 쿠키도 제거합니다.
   */
  @Get('sign-out')
  async signOut(
    @Session() session: ISession,
    @Res({ passthrough: true })
    res: Response,
  ) {
    session.destroy(() => void 0);
    res.clearCookie(ACCESS_TOKEN);
    res.clearCookie(REFRESH_TOKEN);
    return;
  }

  /**
   * access token 리프레시 API
   * @returns 재생성된 access_token을 포함합니다.
   */
  @Get('refresh')
  async refresh(
    @Session()
    session: ISession & Partial<Record<'account', Pick<Account.State, 'id'>>>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string }> {
    const access_token = await this.accountUsecase.refresh({
      id: session.account?.id,
    });
    res.cookie(ACCESS_TOKEN, access_token, { httpOnly: true });
    return { access_token };
  }
}
