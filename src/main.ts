import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.use(
    ['/api', '/api-json'], 
    basicAuth({
      challenge: true,
      users: {
        'admin': 'swaggerPass123',
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Social Media Nest Api')
    .setDescription('Api for Profile management of Social Media')
    .addBearerAuth() 
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

