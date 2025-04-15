import { Module } from '@nestjs/common'
import { EmailService } from './email.service'

/**
 * Модуль для работы с электронной почтой.
 */
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
