import { ResponseBuilderModule } from './utils/resBuild/resBuild.module'
import { PostgresModule } from './db/postgres/postgres.module'
import { SessionModule } from './crud/session/session.module'
import { RedisModule } from './db/redis/redis.module'
import { AuthModule } from './crud/auth/auth.module'
import { JwtModule } from './utils/jwt/jwt.module'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TaskModule } from './crud/task/task.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    ResponseBuilderModule,
    PostgresModule,
    TaskModule,
    SessionModule,
    RedisModule,
    AuthModule,
    JwtModule,
  ],
})
export class AppModule {}
