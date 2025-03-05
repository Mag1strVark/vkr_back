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
    description: 'Массив email кандидатов, участвующих в сессии',
    type: [String],
  })
  @IsArray()
  @IsEmail({}, { each: true })
  candidates: string[]

  @ApiProperty({
    description: 'Массив email сотрудников, участвующих в сессии',
    type: [String],
  })
  @IsArray()
  @IsEmail({}, { each: true })
  employees: string[]

  @ApiProperty({
    description: 'Массив ID задач, связанных с сессией',
    type: [String],
  })
  @IsArray()
  tasks: string[]
}
