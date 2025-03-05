import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsEmail,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSessionDto {
  @ApiProperty({
    description: 'ID рекрутера, создающего сессию',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  recruiter_id: string

  @ApiProperty({
    description: 'Название сессии',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Время начала сессии в формате ISO 8601',
    type: String,
  })
  @IsNotEmpty()
  @IsDateString()
  startTime: string

  @ApiProperty({
    description: 'Продолжительность сессии в минутах',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number

  @ApiProperty({
    description: 'Массив участников (кандидаты и интервьюеры)',
    type: () => [ParticipantDto],
  })
  @IsArray()
  participants: ParticipantDto[]

  @ApiProperty({
    description: 'Массив ID задач, связанных с сессией',
    type: [String],
  })
  @IsArray()
  tasks: string[]
}

export class ParticipantDto {
  @ApiProperty({
    description: 'Email участника',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Полное имя участника',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  full_name: string
}
