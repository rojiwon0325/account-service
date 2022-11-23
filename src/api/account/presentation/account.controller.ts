import {
  Controller,
  Get,
  Inject,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
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

  @Get('sign-in')
  @UseGuards(AuthGuard('google'))
  signIn() {
    // redirect account.google.com
    return;
  }

  @Get('oauth/callback')
  @UseGuards(AuthGuard('google'))
  async callback(
    @Session()
    session: ISession & Partial<Record<'account', Pick<Account.State, 'id'>>>,
    @GoogleProfile() profile: GoogleProfile,
    @Res({ passthrough: true }) res: Response,
  ) {
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

  @Get('sign-out')
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    req.session.destroy(() => void 0);
    res.clearCookie(ACCESS_TOKEN);
    res.clearCookie(REFRESH_TOKEN);
    return;
  }

  @Get('refresh')
  async refresh(
    @Session()
    session: ISession & Partial<Record<'account', Pick<Account.State, 'id'>>>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.accountUsecase.refresh({
      id: session.account?.id,
    });
    res.cookie(ACCESS_TOKEN, access_token, { httpOnly: true });
    return { access_token };
  }
}
