import { ApiProperty } from '@nestjs/swagger'
import { InterviewStage } from '@prisma/client'
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator'

/**
 * DTO для создания собеседования.
 */
export class CreateInterviewDto {
  /**
   * Название собеседования.
   */
  @ApiProperty({ description: 'Название собеседования' })
  @IsNotEmpty()
  @IsString()
  title: string

  /**
   * Статус собеседования.
   */
  @ApiProperty({ description: 'Статус собеседования' })
  @IsNotEmpty()
  @IsString()
  status: InterviewStage

  /**
   * Ссылка на картинку кандидата.
   */
  @ApiProperty({ description: 'Ссылка на картинку кандидата' })
  @IsOptional()
  @IsString()
  candidateImageUrl?: string

  /**
   * ФИО кандидата.
   */
  @ApiProperty({ description: 'ФИО кандидата' })
  @IsNotEmpty()
  @IsString()
  candidateFullName: string

  /**
   * Дата и время проведения собеседования.
   */
  @ApiProperty({ description: 'Дата и время проведения собеседования' })
  @IsNotEmpty()
  interviewDateTime: Date

  /**
   * Длительность собеседования в минутах.
   */
  @ApiProperty({ description: 'Длительность собеседования в минутах' })
  @IsNotEmpty()
  duration: number

  /**
   * Итоговый комментарий к собеседованию.
   */
  @ApiProperty({ description: 'Итоговый комментарий к собеседованию' })
  @IsOptional()
  @IsString()
  finalComment?: string

  /**
   * Ссылка на итоговый отчет.
   */
  @ApiProperty({ description: 'Ссылка на итоговый отчет' })
  @IsOptional()
  @IsString()
  reportLink?: string

  /**
   * Список участников собеседования.
   */
  @ApiProperty({ description: 'Список участников собеседования' })
  @IsArray()
  participantIds: string[]

  /**
   * Список тестов.
   */
  @ApiProperty({ description: 'Список тестов' })
  @IsArray()
  testIds: string[]

  /**
   * Список задач.
   */
  @ApiProperty({ description: 'Список задач' })
  @IsArray()
  taskIds: string[]
}
