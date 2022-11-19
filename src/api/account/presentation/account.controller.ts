import { Controller, Get, Res, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GoogleProfile } from '../google/google-profile';
import { Session as ISession } from 'express-session';
import { IAccountUsecase } from '@ACCOUNT/application/port';
import { Account } from '@ACCOUNT/domain';

@Controller()
export class AccountController {
  constructor(private readonly accountUsecase: IAccountUsecase) {}

  @Get('sign-in')
  @UseGuards(AuthGuard('goole'))
  signIn() {
    // redirect account.google.com
    return;
  }

  @Get('oauth/callback')
  @UseGuards(AuthGuard('goole'))
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
    res.cookie('access_token', access_token, { httpOnly: true });
    return {
      refresh_token: session.id,
      access_token,
    };
  }

  @Get('sign-out')
  async signOut(
    @Session() session: ISession,
    @Res({ passthrough: true }) res: Response,
  ) {
    session.destroy(() => void 0);
    res.clearCookie('access_token');
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
    res.cookie('access_token', access_token, { httpOnly: true });
    return { access_token };
  }
}
