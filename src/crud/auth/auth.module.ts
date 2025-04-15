import { AuthenticationController } from './auth.controller'
import { RefreshService } from './service/refresh.service'
import { RedisModule } from 'src/db/redis/redis.module'
import { AuthService } from './service/auth.service'
import { AuthRepository } from './auth.repository'
import { Module } from '@nestjs/common'

/**
 * Модуль аутентификации (AuthModule).
 *
 * Этот модуль объединяет контроллеры и сервисы, необходимые для аутентификации пользователей.
 */
@Module({
  imports: [RedisModule], // Импорт модуля Redis для работы с токенами
  controllers: [AuthenticationController], // Контроллер для обработки запросов аутентификации
  providers: [AuthService, RefreshService, AuthRepository], // Сервисы и репозиторий для аутентификации
  exports: [AuthRepository, AuthService], // Экспортируемые сервисы для использования в других модулях
})
export class AuthModule {}
