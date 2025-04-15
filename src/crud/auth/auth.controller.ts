import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response, Request } from 'express'
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { ResponseBuildService } from '../../utils/resBuild/resBuild.service'
import { AuthService, ILogin } from './service/auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

/**
 * Контроллер для аутентификации пользователей (AuthenticationController).
 *
 * Этот контроллер обрабатывает запросы на вход, регистрацию, обновление и выход.
 */
@ApiTags('Авторизация')
@Controller('/api/auth')
export class AuthenticationController {
  constructor(
    private authService: AuthService,
    private responseBuilder: ResponseBuildService
  ) {}

  /**
   * Обрабатывает запрос на вход пользователя.
   *
   * @param {LoginDto} dto - Данные для входа пользователя.
   * @param {Response} res - Объект ответа Express для установки cookie.
   * @returns {Promise<ILogin>} - Объект с токеном доступа и данными пользователя.
   * @throws {HttpException} - Если произошла ошибка при входе.
   */
  @ApiOperation({ summary: 'Войти' })
  @Post('login')
  async signIn(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      return await this.authService.login(dto, res)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Обрабатывает запрос на регистрацию нового пользователя.
   *
   * @param {RegisterDto} dto - Данные для регистрации пользователя.
   * @param {Response} res - Объект ответа Express для установки cookie.
   * @returns {Promise<ILogin>} - Объект с токеном доступа и данными пользователя.
   * @throws {HttpException} - Если произошла ошибка при регистрации.
   */
  @ApiOperation({ summary: 'Регистрация' })
  @Post('register')
  async signUp(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    try {
      return await this.authService.register(dto, res)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Обрабатывает запрос на обновление токенов.
   *
   * @param {Request} req - Объект запроса Express для получения cookie.
   * @param {Response} res - Объект ответа Express для установки cookie.
   * @returns {Promise<ILogin>} - Объект с новым токеном доступа и данными пользователя.
   * @throws {HttpException} - Если произошла ошибка при обновлении токенов.
   */
  @ApiOperation({ summary: 'Обновление' })
  @Get('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken
      return await this.authService.refresh(refreshToken, res)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Обрабатывает запрос на выход пользователя из системы.
   *
   * @param {Request} req - Объект запроса Express для получения cookie.
   * @param {Response} res - Объект ответа Express для очистки cookie.
   * @returns {Promise<boolean>} - Возвращает true, если выход выполнен успешно.
   * @throws {HttpException} - Если произошла ошибка при выходе.
   */
  @ApiOperation({ summary: 'Выйти' })
  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken
      return await this.authService.logout(refreshToken, res)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
