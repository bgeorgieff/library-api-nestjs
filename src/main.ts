import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('Library api for the correlated front-end project')
    .setVersion('1.0')
    .addTag('Library')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
