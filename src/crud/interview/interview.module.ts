import { Module } from '@nestjs/common'
import { InterviewController } from './interview.controller'
import { InterviewService } from './interview.service'
import { InterviewRepository } from './interview.repository'

/**
 * Модуль для управления собеседованиями.
 */
@Module({
  controllers: [InterviewController],
  providers: [InterviewService, InterviewRepository],
})
export class InterviewModule {}
