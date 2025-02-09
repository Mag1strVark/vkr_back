import { ApiError } from '../../../utils/apiError/apiError'
import { JwtService } from '../../../utils/jwt/jwt.service'
import { AuthRepository } from '../auth.repository'
import { RefreshService } from './refresh.service'
import { RegisterDto } from '../dto/register.dto'
import { LoginDto } from '../dto/login.dto'
import { Injectable } from '@nestjs/common'
import { $Enums } from '@prisma/client'
import { Response } from 'express'
import * as argon from 'argon2'

export interface IGenerateTokens {
  accessToken: string
  refreshToken: string
}

export interface ILogin {
  accessToken: string
  user: IUser
}

export interface IUser {
  id: string
  full_name: string
  email: string
  role: $Enums.UserRole
}

/**
 * Сервис аутентификации пользователей.
 *
 * Этот сервис предоставляет методы для регистрации, входа, выхода и обновления токенов.
 */
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private refreshService: RefreshService,
    private jwt: JwtService
  ) {}

  /**
   * Генерирует токены доступа и обновления для пользователя.
   *
   * @param {string} userId - ID пользователя, для которого генерируются токены.
   * @param {Response} res - Объект ответа Express для установки cookie.
   * @returns {Promise<IGenerateTokens>} - Объект с токенами доступа и обновления.
   */
  async generateTokens(userId: string, res: Response): Promise<IGenerateTokens> {
    const accessToken = this.jwt.signJwt(userId, '1d')
    const refreshToken = this.jwt.signJwt(userId, '7d')
    await this.refreshService.saveToken(userId, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    })

    return { accessToken, refreshToken }
  }

  /**
   * Выполняет вход пользователя в систему.
   *
   * @param {LoginDto} dto - Данные для входа пользователя.
   * @param {Response} res - Объект ответа Express для установки cookie.
   * @returns {Promise<ILogin>} - Объект с токеном доступа и данными пользователя.
   * @throws {ApiError} - Если пользователь не найден или пароль неверен.
   */
  async login(dto: LoginDto, res: Response): Promise<ILogin> {
    const user = await this.authRepository.login(dto)
    if (!user) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым индексом ${dto.email} не существует`
      )
    }

    const passwordMatched = await argon.verify(user.password, dto.password)
    if (!passwordMatched) {
      throw ApiError.UnauthorizedError()
    }

    const tokens = await this.generateTokens(user.id, res)
    return {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    }
  }

  /**
   * Регистрирует нового пользователя.
   *
   * @param {RegisterDto} dto - Данные для регистрации пользователя.
   * @param {Response} res - Объект ответа Express для установки cookie.
   * @returns {Promise<{ accessToken: string; data: IUser }>} - Объект с токеном доступа и данными пользователя.
   * @throws {ApiError} - Если пользователь с таким email уже существует.
   */
  async register(dto: RegisterDto, res: Response): Promise<ILogin> {
    const candidate = await this.authRepository.findEmail(dto.email)
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым индексом ${candidate.email} уже существует`
      )
    }

    dto.password = await argon.hash(dto.password)
    const user = await this.authRepository.register(dto)
    const tokens = await this.generateTokens(user.id, res)

    return {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    }
  }

  /**
   * Обновляет токены доступа для пользователя.
   *
   * @param {string} refreshToken - Токен обновления, который передается пользователем.
   * @param {Response} res - Объект ответа Express для установки cookie.
   * @returns {Promise<{ accessToken: string; data: IUser }>} - Объект с новым токеном доступа и данными пользователя.
   * @throws {ApiError} - Если токен обновления отсутствует или недействителен.
   */
  async refresh(refreshToken: string, res: Response): Promise<ILogin> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const { data } = this.jwt.verifyJwt(refreshToken) as { data: string }
    if (!data) {
      throw ApiError.UnauthorizedError()
    }

    const tokenData = await this.refreshService.findToken(data)
    if (!tokenData) {
      throw ApiError.UnauthorizedError()
    }

    const user = await this.authRepository.findId(data)
    const tokens = await this.generateTokens(user.id, res)
    return {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    }
  }

  /**
   * Выходит пользователя из системы, удаляя токен обновления.
   *
   * @param {string} refreshToken - Токен обновления, который передается пользователем.
   * @param {Response} res - Объект ответа Express для очистки cookie.
   * @returns {Promise<boolean>} - Возвращает true, если выход выполнен успешно.
   * @throws {ApiError} - Если токен обновления отсутствует или недействителен.
   */
  async logout(refreshToken: string, res: Response): Promise<boolean> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const { data } = this.jwt.verifyJwt(refreshToken) as { data: string }
    if (!data) {
      throw ApiError.UnauthorizedError()
    }

    res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'lax' })
    await this.refreshService.removeToken(data)
    return true
  }
}
