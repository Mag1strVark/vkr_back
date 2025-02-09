import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import type { StringValue } from 'ms'
import * as jwt from 'jsonwebtoken'

/**
 * Сервис для работы с JSON Web Token (JWT).
 *
 * Этот сервис предоставляет методы для создания и проверки JWT.
 */
@Injectable()
export class JwtService {
  constructor(private config: ConfigService) {}

  /**
   * Создает JWT на основе переданного полезного груза и времени истечения.
   *
   * @param {unknown} payload - Полезный груз, который будет закодирован в токене.
   * @param {string} expiresIn - Время жизни токена (например, '1h', '2d').
   * @returns {string} - Сгенерированный JWT.
   * @throws {Error} - Если секрет не задан.
   */
  signJwt(payload: unknown, expiresIn: StringValue): string {
    const secret = this.config.get<string>('JWT_SECRET')
    return jwt.sign({ data: payload }, secret, { expiresIn })
  }

  /**
   * Проверяет и декодирует JWT.
   *
   * @param {string} token - JWT, который необходимо проверить.
   * @returns {unknown} - Декодированный полезный груз, если токен действителен.
   * @throws {JsonWebTokenError} - Если токен недействителен.
   */
  verifyJwt(token: string): unknown {
    const secret = this.config.get<string>('JWT_SECRET')
    return jwt.verify(token, secret)
  }
}
