import { AuthenticationController } from './auth.controller'
import { RefreshService } from './service/refresh.service'
import { RedisModule } from 'src/db/redis/redis.module'
import { AuthService } from './service/auth.service'
import { AuthRepository } from './auth.repository'
import { Module } from '@nestjs/common'

@Module({
  imports: [RedisModule],
  controllers: [AuthenticationController],
  providers: [AuthService, RefreshService, AuthRepository],
  exports: [AuthRepository, AuthService],
})
export class AuthModule {}
