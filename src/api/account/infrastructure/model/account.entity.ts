import { Account } from '@ACCOUNT/domain';
import { TypeOrmBaseEntity } from '@COMMON/base';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class AccountEntity extends TypeOrmBaseEntity implements Account {
  @Column({ unique: true })
  sub!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column({ default: 'default' })
  role!: Account.Role;
}
