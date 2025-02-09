import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { SessionService } from './session.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { JwtAuthGuard } from '../../utils/jwtAuthGuard/jwtAuthGuard'

@ApiTags('Сессии')
@Controller('/api/sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать новую сессию' })
  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto) {
    try {
      const session = await this.sessionService.createSession(createSessionDto)
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Сессия успешно создана',
        data: session,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
