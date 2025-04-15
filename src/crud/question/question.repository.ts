import { Injectable } from '@nestjs/common'
import { PostgresService } from '../../db/postgres/postgres.service'
import { CreateQuestionWithGroupDto } from './dto/create-question.dto'

/**
 * Репозиторий для работы с группами вопросов.
 */
@Injectable()
export class QuestionRepository {
  constructor(private readonly postgres: PostgresService) {}

  /**
   * Создать новую группу вопросов.
   * @param dto Данные для создания группы вопросов.
   */
  async create(dto: CreateQuestionWithGroupDto) {
    return this.postgres.questionGroup.create({
      data: {
        title: dto.title,
        author: dto.author,
        userId: dto.userId,
        categoryName: dto.categoryName,
        questions: {
          create: dto.questions.map((question) => ({
            developerLevel: question.developerLevel,
            questionText: question.questionText,
            correctAnswer: question.correctAnswer,
            comment: question.comment,
          })),
        },
      },
    })
  }

  /**
   * Обновить группу вопросов по ID.
   * @param id Идентификатор группы вопросов.
   * @param dto Данные для обновления группы вопросов.
   */
  async update(id: string, dto: CreateQuestionWithGroupDto) {
    return this.postgres.questionGroup.update({
      where: { id },
      data: {
        title: dto.title,
        author: dto.author,
        userId: dto.userId,
        categoryName: dto.categoryName,
        questions: {
          create: dto.questions.map((question) => ({
            developerLevel: question.developerLevel,
            questionText: question.questionText,
            correctAnswer: question.correctAnswer,
            comment: question.comment,
          })),
        },
      },
    })
  }

  /**
   * Найти группу вопросов по ID.
   * @param id Идентификатор группы вопросов.
   */
  async findById(id: string) {
    return this.postgres.questionGroup.findUnique({ where: { id } })
  }

  /**
   * Удалить группу вопросов по ID.
   * @param id Идентификатор группы вопросов.
   */
  async delete(id: string) {
    return this.postgres.questionGroup.delete({ where: { id } })
  }

  /**
   * Найти все группы вопросов с возможностью фильтрации.
   * @param category * Фильтр по категории.
   * @param userId Фильтр по ID пользователя.
   */
  async findAll(category?: string, userId?: string) {
    const where: any = {}

    if (category) {
      where.categoryName = category
    }

    if (userId) {
      where.userId = userId
    }

    return this.postgres.questionGroup.findMany({
      where,
    })
  }
}
