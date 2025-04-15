import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 * DTO для создания финального теста (CreateFinalTestDto).
 *
 * Этот класс используется для валидации данных, передаваемых при создании финального теста.
 */
export class CreateFinalTestDto {
  @ApiProperty({ description: 'Заголовок теста' })
  @IsNotEmpty()
  @IsString()
  title: string // Заголовок теста

  @ApiProperty({ description: 'Описание теста' })
  @IsNotEmpty()
  @IsString()
  description: string // Описание теста

  @ApiProperty({ description: 'Список групп вопросов IDs' })
  @IsNotEmpty()
  questionGroupId: string[] // Список идентификаторов групп вопросов

  @ApiProperty({ description: 'Список исключаемых вопросов IDs' })
  excludeTaskIds?: string[] // Список идентификаторов исключаемых вопросов (необязательный)
}
