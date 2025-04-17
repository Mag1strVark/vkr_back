import { Module } from '@nestjs/common'
import { QuestionController } from './controller/question.controller'
import { QuestionService } from './service/question.service'
import { QuestionRepository } from './repository/question.repository'
import { CategoryController } from './controller/category.controller'
import { CategoryService } from './service/category.service'
import { CategoryRepository } from './repository/category.repository'

/**
 * Модуль для управления вопросами.
 */
@Module({
  controllers: [QuestionController, CategoryController],
  providers: [QuestionService, QuestionRepository, CategoryService, CategoryRepository],
})
export class QuestionModule {}
