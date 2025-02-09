import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken'

/**
 * Защитник для аутентификации с использованием JSON Web Token (JWT).
 *
 * Этот класс реализует интерфейс CanActivate и проверяет наличие и
 * действительность JWT в заголовке авторизации.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  /**
   * Проверяет, может ли текущий запрос быть обработан.
   *
   * @param {ExecutionContext} context - Контекст выполнения, содержащий информацию о текущем запросе.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} - Возвращает true, если запрос может быть обработан, иначе выбрасывает исключение.
   * @throws {UnauthorizedException} - Если заголовок авторизации отсутствует или токен недействителен.
   */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    // Проверка наличия заголовка авторизации
    if (!authHeader) {
      throw new UnauthorizedException('Заголовок авторизации отсутствует')
    }

    // Разделение заголовка на тип и токен
    const [bearer, token] = authHeader.split(' ')

    // Проверка корректности заголовка авторизации
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Недопустимый заголовок авторизации')
    }

    try {
      // Проверка и декодирование токена
      request.user = jwt.verify(token, process.env.JWT_SECRET)
      return true
    } catch (error) {
      throw new UnauthorizedException('Неверный токен')
    }
  }
}
