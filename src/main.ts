import { PostgresService } from './db/postgres/postgres.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NextFunction, Response, Request } from 'express'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as cookieParser from 'cookie-parser'
import * as process from 'process'

async function bootstrap() {
  const PORT = process.env.PORT || 10000
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    credentials: true,
  })
  app.use(function (_: Request, response: Response, next: NextFunction) {
    response.setHeader('Access-Control-Allow-Origin', 'http://45.93.201.160')
    next()
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  )
  app.use(cookieParser())
  const databaseService = app.get(PostgresService)
  await databaseService.enableShutdownHooks(app)
  const config = new DocumentBuilder()
    .setTitle('Live Coding Platform')
    .setDescription('Документация Api бэкенд части')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/swagger', app, document)
  await app.listen(PORT, () =>
    console.log(`server started on http://45.93.201.160:${PORT}/api/swagger`)
  )
}
bootstrap()
