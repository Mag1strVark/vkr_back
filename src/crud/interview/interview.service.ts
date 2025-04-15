import { Injectable } from '@nestjs/common'
import { InterviewRepository } from './interview.repository'
import { CreateInterviewDto } from './dto/create-interview.dto'

/**
 * Сервис для управления логикой собеседований.
 */
@Injectable()
export class InterviewService {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  /**
   * Создать новое собеседование.
   * @param dto Данные для создания собеседования.
   */
  async create(dto: CreateInterviewDto) {
    return this.interviewRepository.create(dto)
  }

  /**
   * Обновить данные собеседования.
   * @param id Идентификатор собеседования.
   * @param dto Данные для обновления собеседования.
   */
  async update(id: string, dto: CreateInterviewDto) {
    return this.interviewRepository.update(id, dto)
  }

  /**
   * Удалить собеседование.
   * @param id Идентификатор собеседования.
   */
  async delete(id: string) {
    return this.interviewRepository.delete(id)
  }

  /**
   * Получить список всех собеседований.
   * @param page Номер страницы для пагинации.
   * @param limit Количество собеседований на странице.
   * @param search Строка для поиска по названию собеседования.
   */
  async findAll(page?: number, limit?: number, search?: string) {
    return this.interviewRepository.findAll(page, limit, search)
  }

  /**
   * Получить информацию о собеседовании по идентификатору.
   * @param id Идентификатор собеседования.
   */
  async findById(id: string) {
    return this.interviewRepository.findById(id)
  }
}
