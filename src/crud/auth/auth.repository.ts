import { PostgresService } from '../../db/postgres/postgres.service'
import { RegisterDto } from './dto/register.dto'
import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'

/**
 * Репозиторий для работы с пользователями (AuthRepository).
 *
 * Этот класс управляет взаимодействием с базой данных для операций аутентификации.
 */
const SELECT_FIELDS = {
  id: true,
  email: true,
  full_name: true,
  password: true,
  role: true,
}

@Injectable()
export class AuthRepository {
  constructor(private postgres: PostgresService) {}

  /**
   * Выполняет вход пользователя в систему.
   *
   * @param {LoginDto} dto - Данные для входа пользователя.
   * @returns {Promise<any>} - Возвращает пользователя, если вход успешен.
   */
  login(dto: LoginDto) {
    return this.postgres.user.findFirst({
      select: SELECT_FIELDS,
      where: {
        email: dto.email,
      },
    })
  }

  /**
   * Регистрирует нового пользователя.
   *
   * @param {RegisterDto} dto - Данные для регистрации пользователя.
   * @returns {Promise<any>} - Возвращает зарегистрированного пользователя.
   */
  register(dto: RegisterDto) {
    return this.postgres.user.create({
      select: SELECT_FIELDS,
      data: dto,
    })
  }

  /**
   * Находит пользователя по email.
   *
   * @param {string} email - Электронная почта пользователя.
   * @returns {Promise<any>} - Возвращает пользователя, если найден.
   */
  findEmail(email: string) {
    return this.postgres.user.findFirst({
      select: SELECT_FIELDS,
      where: {
        email: email,
      },
    })
  }

  /**
   * Находит пользователя по ID.
   *
   * @param {string} userId - ID пользователя.
   * @returns {Promise<any>} - Возвращает пользователя, если найден.
   */
  findId(userId: string) {
    return this.postgres.user.findFirst({
      where: {
        id: userId,
      },
    })
  }
}
