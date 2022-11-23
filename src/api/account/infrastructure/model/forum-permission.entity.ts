import { TypeOrmBaseEntity } from '@COMMON/base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { ForumPermission } from '../../domain/permission/forum';

@Entity('forum_permissions')
export class ForumPermissionEntity extends TypeOrmBaseEntity {
  @Column()
  account_id!: number;

  @OneToOne(() => AccountEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: AccountEntity;

  @Column({ default: 'Normal' })
  permission!: ForumPermission;
}
