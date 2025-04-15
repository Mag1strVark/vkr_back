import { Module, Global } from '@nestjs/common'
import { JwtService } from './jwt.service'

/**
 * Модуль для работы с JSON Web Token (JWT) (JwtModule).
 *
 * Этот модуль предоставляет сервис для создания и верификации JWT,
 * а также делает его доступным для других модулей приложения.
 */
@Global()
@Module({
  providers: [JwtService], // Сервис, предоставляемый модулем
  exports: [JwtService], // Экспортируемый сервис для использования в других модулях
})
export class JwtModule {}
