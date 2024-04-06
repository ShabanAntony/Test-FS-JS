import { Module } from '@nestjs/common'
import { ConfigModule as EnvConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

// eslint-disable-next-line @nx/enforce-module-boundaries
import { apiPrefix, globalPrefix } from './constants/global'

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: `/${globalPrefix}`,
      exclude: [`/${apiPrefix}/(.*)`],
    }),
  ],
})
export class AppModule {}
