import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { SessionService } from './session.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { JwtAuthGuard } from '../../utils/jwtAuthGuard/jwtAuthGuard'

@ApiTags('Сессии')
@UseGuards(JwtAuthGuard)
@Controller('/api/sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

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

  @ApiOperation({ summary: 'Редактировать сессию' })
  @Patch(':id')
  async updateSession(
    @Param('id') id: string,
    @Body() updateSessionDto: CreateSessionDto
  ) {
    try {
      const session = await this.sessionService.updateSession(id, updateSessionDto)
      return {
        statusCode: HttpStatus.OK,
        message: 'Сессия успешно обновлена',
        data: session,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Удалить сессию' })
  @Delete(':id')
  async deleteSession(@Param('id') id: string) {
    try {
      await this.sessionService.deleteSession(id)
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Сессия успешно удалена',
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
