import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { LoggerFactory } from './logging/logging';

async function start() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: LoggerFactory('Fitness-Club'),
    });

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('Fitness-Club')
      .setDescription('mini project for hospital ')
      .setVersion('1.0.0')
      .addTag('NOdeJs. NestJs, Postgres, Sequelize, JWT, Swagger, Mailer')
      .build();

    const PORT = process.env.PORT || 9090;

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3030);
    console.log(`server startted at:${PORT}`);
  } catch (error) {
    console.log(error);
  }
}
start();
