import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { LoginDto } from './login.dto'

export class RegisterDto extends LoginDto {
  @ApiProperty({ description: 'ФИО', example: 'Барецкий Станислав Валерьевич' })
  @IsString()
  @IsNotEmpty()
  full_name: string

  @ApiProperty({ description: 'Роль пользователя', example: 'RECRUITER' })
  @IsString()
  @IsNotEmpty()
  role: $Enums.UserRole
}
