import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './model/account.entity';
import { ConfigService } from '@nestjs/config';
import { AccountService, AccountUsecase } from './service';
import { AccountController } from './controller/account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService<IEnv, true>) {
        return {
          //secret: configService.get('JWT_SECRET'),
          privateKey: 'private_key',
          publicKey: 'public_key',
          signOptions: { expiresIn: '60s' },
        };
      },
    }),
  ],
  providers: [AccountService, AccountUsecase],
  controllers: [AccountController],
})
export class AccountModule {}
