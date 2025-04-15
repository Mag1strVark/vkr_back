import { Module } from '@nestjs/common'
import { FinalTestController } from './finalTest.controller'
import { FinalTestService } from './finalTest.service'
import { FinalTestRepository } from './finalTest.repository'

/**
 * Модуль для управления финальными тестами (FinalTestModule).
 *
 * Этот модуль объединяет контроллеры и сервисы, необходимые для работы с финальными тестами.
 */
@Module({
  controllers: [FinalTestController], // Контроллер для обработки запросов финальных тестов
  providers: [FinalTestService, FinalTestRepository], // Сервисы и репозиторий для работы с финальными тестами
})
export class FinalTestModule {}
