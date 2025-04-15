import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE_KEY } from './role-auth.decorator'

/**
 * Защитник ролей (RolesGuard) для проверки доступа на основе ролей пользователя.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Проверяет, имеет ли пользователь доступ к маршруту на основе его роли.
   *
   * @param {ExecutionContext} context - Контекст выполнения, содержащий информацию о текущем запросе.
   * @returns {boolean} Возвращает true, если доступ разрешен, иначе выбрасывает исключение UnauthorizedException.
   *
   * @throws {UnauthorizedException} Если пользователь не авторизован или не имеет роли.
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string[]>(ROLE_KEY, context.getHandler())
    if (!requiredRole) {
      return true // Если роли не указаны, доступ разрешен
    }

    const request = context.switchToHttp().getRequest()
    const user: { role: string } = request.user

    if (!user || !user.role) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      })
    }

    return requiredRole.some((role) => user.role === role)
  }
}
