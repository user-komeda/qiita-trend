import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './app/module/app/app.module'
import { DEFAULT_PORT } from './const'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      forbidUnknownValues: true,
    }),
  )
  app.enableCors()

  if (process.env.IS_ENABLE_SWAGGER === 'true') {
    // Swaggerの初期設定
    const config = new DocumentBuilder()
      .setTitle('Test API Project')
      .setDescription('Test API description')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs/', app, document)
  }
  await app.listen(DEFAULT_PORT)
}
void bootstrap()
