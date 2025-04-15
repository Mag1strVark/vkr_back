import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { LoginDto } from './login.dto'

/**
 * DTO для регистрации пользователя (RegisterDto).
 *
 * Этот класс расширяет LoginDto и добавляет дополнительные поля для регистрации.
 */
export class RegisterDto extends LoginDto {
  @ApiProperty({ description: 'ФИО', example: 'Барецкий Станислав Валерьевич' })
  @IsString()
  @IsNotEmpty()
  full_name: string // Полное имя пользователя

  @ApiProperty({ description: 'Роль пользователя', example: 'RECRUITER' })
  @IsString()
  @IsNotEmpty()
  role: $Enums.UserRole // Роль пользователя
}
