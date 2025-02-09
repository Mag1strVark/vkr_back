import { Injectable } from '@nestjs/common'
import { PostgresService } from '../../db/postgres/postgres.service'
import { CreateSessionDto } from './dto/create-session.dto'

@Injectable()
export class SessionRepository {
  constructor(private readonly postgres: PostgresService) {}

  create(dto: CreateSessionDto) {
    return this.postgres.session.create({
      data: {
        title: dto.title,
        startTime: new Date(dto.startTime),
        duration: dto.duration,
        createdById: dto.recruiter_id,
        candidates: {
          connect: dto.candidates.map((id) => ({ id })),
        },
        tasks: {
          connect: dto.tasks.map((id) => ({ id })),
        },
      },
    })
  }
}
