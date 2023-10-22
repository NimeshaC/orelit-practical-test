import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 8000);
  console.log(`⚡️[server]: Server is running at : ${await app.getUrl()}`);
}
bootstrap();
