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

@ApiTags('Авторизация')
@Controller('/api/auth')
export class AuthenticationController {
  constructor(
    private authService: AuthService,
    private responseBuilder: ResponseBuildService
  ) {}

  @ApiOperation({ summary: 'Войти' })
  @Post('login')
  async signIn(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      return await this.authService.login(dto, res)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Регистрация' })
  @Post('register')
  async signUp(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    try {
      return await this.authService.register(dto, res)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

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
