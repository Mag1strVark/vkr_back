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
  Query,
  Get,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common'
import { SessionService } from './session.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { FilterSessionsDto } from './dto/filter-sessions.dto'
import { JwtAuthGuard } from '../../utils/jwtAuthGuard/jwtAuthGuard'
import { AddTasksDto } from './dto/add-tasks.dto'
import { RolesGuard } from '../../utils/roleGuard/roles.guard'
import { Roles } from '../../utils/roleGuard/role-auth.decorator'

// TODO Вынести в другой файл
const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return data ? request.user[data] : request.user
})

@ApiTags('Сессии')
@UseGuards(JwtAuthGuard)
@Controller('/api/sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({ summary: 'Получить список сессий' })
  @UseGuards(RolesGuard)
  @Roles(['HR', 'INTERVIEWER'])
  @Get()
  async getSessions(@Query() filter: FilterSessionsDto, @User() user: any) {
    try {
      const result = await this.sessionService.getSessions(filter, user.role, user.id)
      return {
        statusCode: HttpStatus.OK,
        message: 'Sessions retrieved successfully',
        data: result,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Создать новую сессию' })
  @UseGuards(RolesGuard)
  @Roles(['HR'])
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
  @UseGuards(RolesGuard)
  @Roles(['HR'])
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
  @UseGuards(RolesGuard)
  @Roles(['HR'])
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

  @ApiOperation({ summary: 'Получить информацию о сессии' })
  @UseGuards(RolesGuard)
  @Roles(['HR', 'INTERVIEWER'])
  @Get(':id')
  async getSession(@Param('id') id: string) {
    try {
      const session = await this.sessionService.getSessionById(id)
      return {
        statusCode: HttpStatus.OK,
        message: 'Session retrieved successfully',
        data: session,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Добавить задачи к сессии' })
  @UseGuards(RolesGuard)
  @Roles(['INTERVIEWER'])
  @Patch(':id/tasks')
  async addTasksToSession(@Param('id') id: string, @Body() addTasksDto: AddTasksDto) {
    try {
      const updatedSession = await this.sessionService.addTasksToSession(
        id,
        addTasksDto.taskIds
      )
      return {
        statusCode: HttpStatus.OK,
        message: 'Tasks added to session successfully',
        data: updatedSession,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
