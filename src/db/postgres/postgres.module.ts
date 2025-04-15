import { Global, Module } from '@nestjs/common'
import { PostgresService } from './postgres.service'

/**
 * Модуль для работы с PostgreSQL (PostgresModule).
 *
 * Этот модуль предоставляет сервис для взаимодействия с базой данных PostgreSQL
 * и делает его доступным для других модулей приложения.
 */
@Global()
@Module({
  providers: [PostgresService], // Сервис, предоставляемый модулем
  exports: [PostgresService], // Экспортируемый сервис для использования в других модулях
})
export class PostgresModule {}
