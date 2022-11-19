import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions, Profile } from 'passport-google-oauth20';
import { GoogleProfile } from './google-profile';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const option: StrategyOptions = {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
      scope: ['email', 'profile'],
    };
    super(option);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): GoogleProfile {
    // 구글로 부터 넘겨받은 사용자 정보
    console.log(profile);
    return { sub: '', username: '', email: '' };
  }
}
