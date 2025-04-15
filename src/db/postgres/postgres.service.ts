import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as process from 'process'

/**
 * Сервис для работы с PostgreSQL через Prisma (PostgresService).
 *
 * Этот сервис управляет подключением к базе данных PostgreSQL
 * и реализует интерфейсы для инициализации и завершения работы модуля.
 */
@Injectable()
export class PostgresService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Метод, вызываемый при инициализации модуля.
   * Устанавливает соединение с базой данных.
   */
  async onModuleInit() {
    await this.$connect()
  }

  /**
   * Метод, вызываемый при завершении работы модуля.
   * Закрывает соединение с базой данных.
   */
  async onModuleDestroy() {
    await this.$disconnect()
  }

  /**
   * Включает обработку завершения работы приложения.
   *
   * @param {INestApplication} app - Экземпляр приложения NestJS.
   */
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close()
    })
  }
}
