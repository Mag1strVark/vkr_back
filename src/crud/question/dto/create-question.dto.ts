import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator'
import { Category } from '@prisma/client'

/**
 * DTO для вопроса.
 */
class QuestionDto {
  /**
   * Уровень разработчика.
   */
  @ApiProperty({ description: 'Уровень разработчика' })
  @IsNotEmpty()
  @IsString()
  developerLevel: string

  /**
   * Текст вопроса.
   */
  @ApiProperty({ description: 'Текст вопроса' })
  @IsNotEmpty()
  @IsString()
  questionText: string

  /**
   * Правильный ответ.
   */
  @ApiProperty({ description: 'Правильный ответ' })
  @IsNotEmpty()
  @IsString()
  correctAnswer: string

  /**
   * Комментарий к вопросу.
   */
  @ApiProperty({ description: 'Комментарий' })
  @IsString()
  comment?: string
}

/**
 * DTO для создания группы вопросов.
 */
export class CreateQuestionWithGroupDto {
  /**
   * Название группы вопросов.
   */
  @ApiProperty({ description: 'Название группы вопросов' })
  @IsNotEmpty()
  @IsString()
  title: string

  /**
   * Автор группы вопросов.
   */
  @ApiProperty({ description: 'Автор группы вопросов' })
  @IsNotEmpty()
  @IsString()
  author: string

  /**
   * ID пользователя, создающего группу вопросов.
   */
  @ApiProperty({ description: 'ID пользователя, создающего группу вопросов' })
  @IsNotEmpty()
  @IsString()
  userId: string // Добавлено поле userId

  /**
   * Категория группы вопросов.
   */
  @ApiProperty({ description: 'Категория группы вопросов' })
  @IsNotEmpty()
  @IsString()
  categoryName: Category // Добавлено поле categoryName

  /**
   * Список вопросов в группе.
   */
  @ApiProperty({ type: [QuestionDto], description: 'Список вопросов в группе' })
  @IsArray()
  @ArrayNotEmpty()
  questions: QuestionDto[]
}
