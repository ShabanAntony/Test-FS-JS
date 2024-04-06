import {
  INestApplication,
  Logger,
  NotAcceptableException,
  ValidationPipe,
} from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { json, urlencoded } from 'express'
import * as fs from 'fs'
import helmet from 'helmet'
import { join } from 'path'

// eslint-disable-next-line @nx/enforce-module-boundaries
import packageConfig from '../../../package.json'
import { AppModule } from './app.module'
import { apiPrefix, host, port, swaggerPrefix } from './constants/global'
import { AllExceptionsFilter } from './utils/exceptions/allExceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const httpAdapterHost = app.get(HttpAdapterHost)

  app.setGlobalPrefix(apiPrefix)
  app.enableCors({
    origin: [
      // for e2e tests
      'http://localhost',
    ],
  })
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.reduce(
          (result, { constraints, property }) => {
            result[property] = Object.values(constraints).map(
              (description) => description,
            )

            return result
          },
          {} as Record<string, string[]>,
        )

        return new NotAcceptableException(errorMessages)
      },
    }),
  )

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost))

  initSwagger(app)

  await app.listen(port)

  Logger.log(`🚀 Application is running on: ${host}/${apiPrefix}`)
}

function initSwagger(app: INestApplication) {
  if (!process.env.SWAGGER_ENABLED) {
    return
  }

  Logger.log(`🚀 Swagger  is running on: ${host}/${swaggerPrefix}`)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Onliner BFF API')
    .setVersion(packageConfig.version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup(swaggerPrefix, app, document)

  // enabled only for local development
  if (process.env.NODE_ENV === 'development') {
    // write swagger config to the disk, to generate client code in future
    fs.writeFileSync(
      join(
        __dirname,
        '..',
        '..',
        '..',
        'libs',
        'bff-api',
        'swagger',
        'config.json',
      ),
      JSON.stringify(document, null, 4),
    )
  }
}

bootstrap()
