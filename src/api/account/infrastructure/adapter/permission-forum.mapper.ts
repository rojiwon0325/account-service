import { ForumPermission } from '@ACCOUNT/domain/permission/forum';
import { AccountEntity } from '../model/account.entity';
import { ForumPermissionEntity } from '../model/forum-permission.entity';

export const mapForumPermission = (
  account_id: AccountEntity['id'],
  permission: ForumPermission | 'None',
): ForumPermissionEntity => {
  const entity = new ForumPermissionEntity();
  entity.account_id = account_id;
  if (permission !== 'None') entity.permission = permission;
  return entity;
};
