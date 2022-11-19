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
import { IAccountUsecase } from '@ACCOUNT/service/interface';

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
    @Session() session: ISession & Record<'sub', string>,
    @GoogleProfile() profile: GoogleProfile,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.accountUsecase.signIn(profile);
    session.sub = profile.sub;
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
    @Session() session: ISession & Partial<Record<'sub', string>>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.accountUsecase.refresh({
      sub: session.sub,
    });
    res.cookie('access_token', access_token, { httpOnly: true });
    return { access_token };
  }
}
