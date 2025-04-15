import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum } from 'class-validator'
import { Difficulty, Category } from '@prisma/client'

export class CreateTaskDto {
  @ApiProperty({
    description: 'Название задачи',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Id пользователя',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string

  @ApiProperty({
    description: 'Категория задачи',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  categoryName: Category

  @ApiProperty({ description: 'Исходные данные для кода в формате JSON' })
  @IsNotEmpty()
  inputData: Record<string, any>

  @ApiProperty({ description: 'Исходный код' })
  @IsNotEmpty()
  @IsString()
  sourceCode: string

  @ApiProperty({
    description: 'Правильный ответ задачи в формате JSON',
    type: Object,
  })
  @IsNotEmpty()
  correctAnswer: Record<string, any>

  @ApiProperty({
    description: 'Описание задачи',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({
    description: 'Уровень сложности задачи',
    enum: Difficulty,
  })
  @IsNotEmpty()
  @IsEnum(Difficulty)
  difficulty: Difficulty
}
