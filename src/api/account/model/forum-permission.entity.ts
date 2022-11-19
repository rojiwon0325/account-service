import { TypeOrmBaseEntity } from '@COMMON/base';
import { Entity } from 'typeorm';
import { ForumPermission } from './permission/forum';

@Entity('forum_permissions')
export class ForumPermissionEntity extends TypeOrmBaseEntity {
  account_id!: number;
  permission!: ForumPermission;
}
