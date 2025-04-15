import { Module } from '@nestjs/common'
import { CandidateInterviewController } from './сandidateInterview.controller'
import { CandidateInterviewService } from './сandidateInterview.service'
import { CandidateInterviewRepository } from './сandidateInterview.repository'

@Module({
  controllers: [CandidateInterviewController],
  providers: [CandidateInterviewService, CandidateInterviewRepository],
})
export class CandidateInterviewModule {}
