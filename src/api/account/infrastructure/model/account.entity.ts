import { TypeOrmBaseEntity } from '@COMMON/base';
import { Column, Entity } from 'typeorm';

@Entity('accounts')
export class AccountEntity extends TypeOrmBaseEntity {
  @Column({ unique: true })
  sub!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;
}
