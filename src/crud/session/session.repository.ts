import { Injectable } from '@nestjs/common'
import { PostgresService } from '../../db/postgres/postgres.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { FilterSessionsDto } from './dto/filter-sessions.dto'

@Injectable()
export class SessionRepository {
  constructor(private readonly postgres: PostgresService) {}

  findAll(filter: FilterSessionsDto, skip: number, take: number) {
    const { title, startDate, endDate, status } = filter

    return this.postgres.session.findMany({
      where: {
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
        ...(startDate && { startTime: { gte: startDate } }),
        ...(endDate && { startTime: { lte: endDate } }),
        ...(status && { status }),
      },
      skip,
      take,
    })
  }

  count(filter: FilterSessionsDto) {
    const { title, startDate, endDate, status } = filter

    return this.postgres.session.count({
      where: {
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
        ...(startDate && { startTime: { gte: startDate } }),
        ...(endDate && { startTime: { lte: endDate } }),
        ...(status && { status }),
      },
    })
  }

  findByInterviewerId(
    interviewerId: string,
    filter: FilterSessionsDto,
    skip: number,
    take: number
  ) {
    const { title, startDate, endDate, status } = filter

    return this.postgres.session.findMany({
      where: {
        createdById: interviewerId,
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
        ...(startDate && { startTime: { gte: startDate } }),
        ...(endDate && { startTime: { lte: endDate } }),
        ...(status && { status }),
      },
      skip,
      take,
    })
  }

  create(dto: CreateSessionDto) {
    return this.postgres.session.create({
      data: {
        title: dto.title,
        startTime: new Date(dto.startTime),
        duration: dto.duration,
        createdById: dto.recruiter_id,
        participants: {
          connect: dto.participants.map((participant) => ({ email: participant.email })),
        },
        tasks: {
          connect: dto.tasks.map((id) => ({ id })),
        },
      },
    })
  }

  addTasks(sessionId: string, taskIds: string[]) {
    return this.postgres.session.update({
      where: { id: sessionId },
      data: {
        tasks: {
          connect: taskIds.map((id) => ({ id })),
        },
      },
    })
  }

  findById(id: string) {
    return this.postgres.session.findUnique({
      where: { id },
      include: {
        participants: true,
        tasks: true,
      },
    })
  }

  update(id: string, dto: CreateSessionDto) {
    return this.postgres.session.update({
      where: { id },
      data: {
        title: dto.title,
        startTime: new Date(dto.startTime),
        duration: dto.duration,
        createdById: dto.recruiter_id,
        participants: {
          connect: dto.participants.map((participant) => ({ email: participant.email })),
        },
        tasks: {
          connect: dto.tasks.map((id) => ({ id })),
        },
      },
    })
  }

  updateActive(id: string, active: boolean) {
    return this.postgres.session.update({
      where: { id },
      data: {
        isActive: active,
      },
    })
  }

  delete(id: string) {
    return this.postgres.session.delete({
      where: { id },
    })
  }
}
