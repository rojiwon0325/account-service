import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './infrastructure/model/account.entity';
import { ConfigService } from '@nestjs/config';
import { AccountService, AccountUsecase } from './application/adapter';
import { AccountController } from './presentation/account.controller';
import { AccountEntityMapper } from './infrastructure/adapter/account.mapper';
import { AccountRepository } from './infrastructure/adapter/account.repository';
import { GoogleStrategy } from './google';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService<IEnv, true>) {
        return {
          privateKey: configService.get('ACCESS_TOKEN_PRIVATEKEY'),
          signOptions: {
            expiresIn: configService.get('ACCESS_TOKEN_EXPIRESIN'),
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  providers: [
    AccountEntityMapper,
    AccountRepository,
    AccountService,
    AccountUsecase,
    GoogleStrategy,
  ],
  controllers: [AccountController],
})
export class AccountModule {}
