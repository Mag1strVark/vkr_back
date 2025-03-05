import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE_KEY } from './role-auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.get<string[]>(ROLE_KEY, context.getHandler())
    if (!requiredRole) {
      return true
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
