import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from './app/app.module'
import { DEFAULT_PORT } from './const'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, forbidUnknownValues: true }),
  )
  app.enableCors()
  await app.listen(DEFAULT_PORT)
}
void bootstrap()
