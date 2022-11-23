type IEnv = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  ACCESS_TOKEN_PRIVATEKEY: string;
  ACCESS_TOKEN_EXPIRESIN: string;

  SESSION_SECRET: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  OAUTH_CALLBACK: string;
};

declare namespace NodeJS {
  interface ProcessEnv extends IEnv {
    [key: string]: string | undefined;
  }
}
