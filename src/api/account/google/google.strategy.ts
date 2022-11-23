import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions, Profile } from 'passport-google-oauth20';
import { GoogleProfile } from './google-profile';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService<IEnv, true>) {
    const option: StrategyOptions = {
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('OAUTH_CALLBACK'),
      scope: ['email', 'profile'],
    };
    super(option);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    { _json: { sub, name, email: _email } }: Profile,
  ): GoogleProfile {
    // 구글로 부터 넘겨받은 사용자 정보
    const username = throw_if_null(
      name,
      HttpExceptionFactory('UnAuthorized', 'username is required'),
    );
    const email = throw_if_null(
      _email,
      HttpExceptionFactory('UnAuthorized', 'email is required'),
    );
    return { sub, username, email };
  }
}
