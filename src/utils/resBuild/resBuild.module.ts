import { Global, Module } from '@nestjs/common'
import { ResponseBuildService } from './resBuild.service'

/**
 * Модуль для построения ответов (ResponseBuilderModule).
 *
 * Этот модуль предоставляет сервис для построения ответов и делает его доступным
 * для других модулей приложения.
 */
@Global()
@Module({
  providers: [ResponseBuildService], // Сервис, предоставляемый модулем
  exports: [ResponseBuildService], // Экспортируемый сервис для использования в других модулях
})
export class ResponseBuilderModule {}
