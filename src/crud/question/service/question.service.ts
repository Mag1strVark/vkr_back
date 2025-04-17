import { Injectable, NotFoundException } from '@nestjs/common'
import { QuestionRepository } from '../repository/question.repository'
import { CreateQuestionWithGroupDto } from '../dto/create-question.dto'

/**
 * Сервис для управления вопросами.
 */
@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  /**
   * Создать новую группу вопросов.
   * @param dto Данные для создания группы вопросов.
   */
  async create(dto: CreateQuestionWithGroupDto) {
    return this.questionRepository.create(dto)
  }

  /**
   * Обновить группу вопросов по ID.
   * @param id Идентификатор группы вопросов.
   * @param questionDto Данные для обновления группы вопросов.
   */
  async update(id: string, questionDto: CreateQuestionWithGroupDto) {
    const questionGroup = await this.questionRepository.findById(id)
    if (!questionGroup) {
      throw new NotFoundException(`Question Group with ID ${id} not found`)
    }
    return this.questionRepository.update(id, questionDto)
  }

  /**
   * Удалить группу вопросов по ID.
   * @param id Идентификатор группы вопросов.
   */
  async delete(id: string) {
    const questionGroup = await this.questionRepository.findById(id)
    if (!questionGroup) {
      throw new NotFoundException(`Question Group with ID ${id} not found`)
    }
    return this.questionRepository.delete(id)
  }

  /**
   * Получить все группы вопросов с возможностью фильтрации.
   * @param category Фильтр по категории.
   * @param userId Фильтр по ID пользователя.
   */
  async getAll(category?: string, userId?: string) {
    return this.questionRepository.findAll(category, userId)
  }
}
