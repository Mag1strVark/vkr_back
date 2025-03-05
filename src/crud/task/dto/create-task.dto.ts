import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum } from 'class-validator'
import { Difficulty } from '@prisma/client'

export class CreateTaskDto {
  @ApiProperty({
    description: 'Название задачи',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Код задачи',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  code: string

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
