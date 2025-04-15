import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'

/**
 * Модуль для работы с Redis (RedisModule).
 *
 * Этот модуль предоставляет сервис для взаимодействия с базой данных Redis
 * и делает его доступным для других модулей приложения.
 */
@Global()
@Module({
  providers: [RedisService], // Сервис, предоставляемый модулем
  exports: [RedisService], // Экспортируемый сервис для использования в других модулях
})
export class RedisModule {}
