import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название категории группы вопросов' })
  @IsNotEmpty()
  name: string
}
