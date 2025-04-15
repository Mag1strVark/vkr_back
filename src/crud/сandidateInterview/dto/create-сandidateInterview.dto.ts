import { ApiProperty } from '@nestjs/swagger'
import { InterviewStage } from '@prisma/client'
import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator'

export class CreateCandidateInterviewDto {
  @ApiProperty({
    description: 'ФИО кандидата',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string

  @ApiProperty({
    description: 'Почта кандидата',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Контактные данные кандидата',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  contactDetails: string

  @ApiProperty({
    description: 'Ссылка на картинку пользователя',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string

  @ApiProperty({
    description: 'Должность по вакансии',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  position: string

  @ApiProperty({
    description: 'Дата отклика',
    type: Date,
  })
  @IsNotEmpty()
  applicationDate: Date

  @ApiProperty({
    description: 'Этап собеседования',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  interviewStage: InterviewStage

  @ApiProperty({
    description: 'Комментарий к карточке кандидата (необязательное поле)',
    type: String,
  })
  @IsString()
  comment?: string
}
