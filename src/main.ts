import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      name: 'refresh_token',
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 100,
      },
      rolling: true,
    }),
  );
  await app.listen(process.env.PORT, () => {
    console.log("I'm Ready!");
    process.send ? process.send('ready') : undefined;
  });
}
bootstrap();
