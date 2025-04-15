import { SetMetadata } from '@nestjs/common'

/**
 * Ключ для метаданных роли.
 */
export const ROLE_KEY = 'role'

/**
 * Декоратор для установки ролей для обработчиков маршрутов.
 *
 * @param {string[]} roles - Массив ролей, которые имеют доступ к маршруту.
 * @returns {MethodDecorator} Декоратор метода, который устанавливает метаданные ролей.
 *
 * @example
 *
 * @Roles(['admin', 'user'])
 * @Get('protected-route')
 * async getProtectedRoute() {
 *   // Логика вашего обработчика здесь
 * }
 */
export const Roles = (roles: string[]) => SetMetadata(ROLE_KEY, roles)
