import { Injectable } from '@nestjs/common'
import { FinalTestRepository } from './finalTest.repository'
import { CreateFinalTestDto } from './dto/create-final-test.dto'

/**
 * Сервис для управления финальными тестами (FinalTestService).
 *
 * Этот класс предоставляет методы для создания, обновления, удаления и получения финальных тестов.
 */
@Injectable()
export class FinalTestService {
  constructor(private readonly finalTestRepository: FinalTestRepository) {}

  /**
   * Создает новый финальный тест.
   *
   * @param {CreateFinalTestDto} dto - Данные для создания теста.
   * @returns {Promise<any>} - Возвращает созданный финальный тест.
   */
  async create(dto: CreateFinalTestDto) {
    return this.finalTestRepository.create(dto)
  }

  /**
   * Обновляет финальный тест по ID.
   *
   * @param {string} id - ID теста для обновления.
   * @param {CreateFinalTestDto} dto - Данные для обновления теста.
   * @returns {Promise<any>} - Возвращает обновленный финальный тест.
   */
  async update(id: string, dto: CreateFinalTestDto) {
    return this.finalTestRepository.update(id, dto)
  }

  /**
   * Удаляет финальный тест по ID.
   *
   * @param {string} id - ID теста для удаления.
   * @returns {Promise<any>} - Возвращает результат удаления.
   */
  async delete(id: string) {
    return this.finalTestRepository.delete(id)
  }

  /**
   * Получает список всех финальных тестов с пагинацией и поиском.
   *
   * @param {number} page - Номер страницы для пагинации (по умолчанию 1).
   * @param {number} limit - Количество тестов на странице (по умолчанию 10).
   * @param {string} search - Строка для поиска по заголовкам тестов (необязательный).
   * @returns {Promise<any>} - Возвращает список финальных тестов.
   */
  async findAll(page?: number, limit?: number, search?: string) {
    return this.finalTestRepository.findAll(page, limit, search)
  }

  /**
   * Получает финальный тест по ID.
   *
   * @param {string} id - ID теста для получения информации.
   * @returns {Promise<any>} - Возвращает информацию о финальном тесте.
   */
  async findById(id: string) {
    return this.finalTestRepository.findById(id)
  }
}
