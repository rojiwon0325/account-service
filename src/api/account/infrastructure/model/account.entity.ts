import { TypeOrmBaseEntity } from '@COMMON/base';
import { Column, Entity, OneToOne } from 'typeorm';
import { ForumPermissionEntity } from './forum-permission.entity';

@Entity('accounts')
export class AccountEntity extends TypeOrmBaseEntity {
  @Column({ unique: true })
  sub!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @OneToOne(() => ForumPermissionEntity)
  permission_forum!: ForumPermissionEntity;
}
