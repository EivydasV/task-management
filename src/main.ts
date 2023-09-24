import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import supertokens from 'supertokens-node';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { SupertokensExceptionFilter } from './auth/filter/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    abortOnError: false,
  });
  app.use(
    helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidUnknownValues: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((prev, current) => {
          return {
            ...prev,
            [current.property]:
              Object.values(current?.constraints || {})[0] || '',
          };
        }, {});

        return new UnprocessableEntityException([formattedErrors]);
      },
    }),
  );

  app.use(verifySession({ sessionRequired: false }));

  await app.listen(3000);
}
bootstrap();
