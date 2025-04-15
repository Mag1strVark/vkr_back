import { Injectable } from '@nestjs/common'
import { PostgresService } from '../../db/postgres/postgres.service'
import { CreateInterviewDto } from './dto/create-interview.dto'

/**
 * Репозиторий для работы с данными собеседований.
 */
@Injectable()
export class InterviewRepository {
  constructor(private readonly postgres: PostgresService) {}

  /**
   * Создать новое собеседование.
   * @param dto Данные для создания собеседования.
   */
  async create(dto: CreateInterviewDto) {
    return this.postgres.interview.create({
      data: {
        title: dto.title,
        status: dto.status,
        candidateImageUrl: dto.candidateImageUrl,
        candidateFullName: dto.candidateFullName,
        interviewDateTime: dto.interviewDateTime,
        duration: dto.duration,
        finalComment: dto.finalComment,
        reportLink: dto.reportLink,
        participants: {
          connect: dto.participantIds.map((id) => ({ id })),
        },
        tests: {
          connect: dto.testIds.map((id) => ({ id })),
        },
        tasks: {
          connect: dto.taskIds.map((id) => ({ id })),
        },
      },
    })
  }

  /**
   * Обновить данные собеседования.
   * @param id Идентификатор собеседования.
   * @param dto Данные для обновления собеседования.
   */
  async update(id: string, dto: CreateInterviewDto) {
    return this.postgres.interview.update({
      where: { id },
      data: {
        title: dto.title,
        status: dto.status,
        candidateImageUrl: dto.candidateImageUrl,
        candidateFullName: dto.candidateFullName,
        interviewDateTime: dto.interviewDateTime,
        duration: dto.duration,
        finalComment: dto.finalComment,
        reportLink: dto.reportLink,
        participants: {
          connect: dto.participantIds.map((id) => ({ id })),
        },
        tests: {
          connect: dto.testIds.map((id) => ({ id })),
        },
        tasks: {
          connect: dto.taskIds.map((id) => ({ id })),
        },
      },
    })
  }

  /**
   * Получить список всех собеседований с пагинацией и поиском.
   * @param page Номер страницы.
   * @param limit Количество собеседований на странице.
   * @param search Строка для поиска.
   */
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit

    const [interviews, totalCount] = await Promise.all([
      this.postgres.interview.findMany({
        skip,
        take: limit,
        where: search
          ? {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {},
      }),
      this.postgres.interview.count({
        where: search
          ? {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {},
      }),
    ])

    return {
      data: interviews,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    }
  }

  /**
   * Получить информацию о собеседовании по идентификатору.
   * @param id Идентификатор собеседования.
   */
  async findById(id: string) {
    return this.postgres.interview.findUnique({
      where: { id },
      include: {
        participants: true,
        tests: true,
        tasks: true,
      },
    })
  }

  /**
   * Удалить собеседование по идентификатору.
   * @param id Идентификатор собеседования.
   */
  async delete(id: string) {
    return this.postgres.interview.delete({
      where: { id },
    })
  }
}
