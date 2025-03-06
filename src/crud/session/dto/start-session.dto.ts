import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class StartSessionDto {
  @ApiProperty({ description: 'ID сессии' })
  @IsString()
  sessionId: string
}
