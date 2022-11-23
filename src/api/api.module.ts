import { AccountModule } from '@ACCOUNT/account.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AccountModule],
})
export class ApiModule {}
