import { IsEnum, IsOptional, IsString } from 'class-validator'
import { InterviewStatus } from '@prisma/client'

export class FilterSessionsDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  startDate?: Date

  @IsOptional()
  endDate?: Date

  @IsOptional()
  @IsEnum(InterviewStatus)
  status?: InterviewStatus

  @IsOptional()
  page?: number

  @IsOptional()
  pageSize?: number
}
