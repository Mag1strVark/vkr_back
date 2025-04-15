import { HttpStatus } from '@nestjs/common'

/**
 * Класс для представления ошибок API (ApiError).
 *
 * Этот класс расширяет стандартный класс ошибки и добавляет
 * дополнительные свойства для статуса и ошибок.
 */
export class ApiError extends Error {
  status: number // HTTP статус ошибки
  errors: any[] // Дополнительные ошибки или детали

  /**
   * Конструктор для создания экземпляра ApiError.
   *
   * @param {number} status - HTTP статус ошибки.
   * @param {string} message - Сообщение об ошибке.
   * @param {any[]} [errors] - Дополнительные ошибки или детали (по умолчанию пустой массив).
   */
  constructor(status: number, message: string, errors: any[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  /**
   * Создает экземпляр ApiError для неавторизованного доступа.
   *
   * @returns {ApiError} Экземпляр ApiError с статусом 401 (Unauthorized).
   */
  static UnauthorizedError(): ApiError {
    return new ApiError(HttpStatus.UNAUTHORIZED, 'Пользователь не авторизован')
  }

  /**
   * Создает экземпляр ApiError для неверного запроса.
   *
   * @param {string} message - Сообщение об ошибке.
   * @param {any[]} [errors] - Дополнительные ошибки или детали (по умолчанию пустой массив).
   * @returns {ApiError} Экземпляр ApiError с статусом 400 (Bad Request).
   */
  static BadRequest(message: string, errors: any[] = []): ApiError {
    return new ApiError(HttpStatus.BAD_REQUEST, message, errors)
  }

  /**
   * Создает экземпляр ApiError для не найденного ресурса.
   *
   * @param {string} message - Сообщение об ошибке.
   * @param {any[]} [errors] - Дополнительные ошибки или детали (по умолчанию пустой массив).
   * @returns {ApiError} Экземпляр ApiError с статусом 404 (Not Found).
   */
  static NotFound(message: string, errors: any[] = []): ApiError {
    return new ApiError(HttpStatus.NOT_FOUND, message, errors)
  }
}
