import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as dotenv from 'dotenv';
import { ErrorLogFilter } from './modules/error-log/error-log.filter';
import { ErrorLogService } from './modules/error-log/error-log.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const errorLogsService = app.get(ErrorLogService);
  app.useGlobalFilters(new ErrorLogFilter(errorLogsService));
  app.use(
    ['/api', '/api-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER as string]: process.env.SWAGGER_PASS as string,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Social Media Nest Api')
    .setDescription('Api for Profile management of Social Media')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
