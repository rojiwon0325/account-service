import { Account } from '../domain';

export const map_access_token_payload = (
  account: Account,
): Account.AccessTokenPayload => {
  const { id, username, email, role } = account;
  return { id, username, email, role };
};
