import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * DTO для входа пользователя (LoginDto).
 *
 * Этот класс используется для валидации данных, передаваемых при входе пользователя.
 */
export class LoginDto {
  @ApiProperty({ description: 'Почта', example: 'user@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string // Электронная почта пользователя

  @ApiProperty({ description: 'Пароль', example: 'root1234' })
  @IsString()
  @IsNotEmpty()
  password: string // Пароль пользователя
}
