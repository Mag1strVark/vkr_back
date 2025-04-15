import { ResponseBuilderModule } from './utils/resBuild/resBuild.module'
import { PostgresModule } from './db/postgres/postgres.module'
import { SessionModule } from './crud/session/session.module'
import { RedisModule } from './db/redis/redis.module'
import { AuthModule } from './crud/auth/auth.module'
import { JwtModule } from './utils/jwt/jwt.module'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TaskModule } from './crud/task/task.module'
import { QuestionModule } from './crud/question/question.module'
import { FinalTestModule } from './crud/finalTest/finalTest.module'
import { CandidateInterviewModule } from './crud/сandidateInterview/сandidateInterview.module'
import { InterviewModule } from './crud/interview/interview.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    CandidateInterviewModule,
    CandidateInterviewModule,
    ResponseBuilderModule,
    FinalTestModule,
    InterviewModule,
    PostgresModule,
    QuestionModule,
    SessionModule,
    RedisModule,
    AuthModule,
    TaskModule,
    JwtModule,
  ],
})
export class AppModule {}
