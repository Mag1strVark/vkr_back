import { Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'
import { SessionRepository } from './session.repository'
import { EmailModule } from '../mail/email.module'
import { AuthModule } from '../auth/auth.module'
import { SessionGateway } from './session.gateway'

@Module({
  controllers: [SessionController],
  providers: [SessionService, SessionRepository, SessionGateway],
  imports: [EmailModule, AuthModule],
})
export class SessionModule {}
