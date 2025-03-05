import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../utils/jwtAuthGuard/jwtAuthGuard'
import { RolesGuard } from '../../utils/roleGuard/roles.guard'
import { Roles } from '../../utils/roleGuard/role-auth.decorator'

@ApiTags('Задачи')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Создать новую задачу' })
  @UseGuards(RolesGuard)
  @Roles(['INTERVIEWER'])
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskService.create(createTaskDto)
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Задача успешно создана',
        data: task,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Получить список всех задач' })
  @UseGuards(RolesGuard)
  @Roles(['INTERVIEWER'])
  @Get()
  async findAll() {
    try {
      const tasks = await this.taskService.findAll()
      return {
        statusCode: HttpStatus.OK,
        message: 'Задачи успешно получены',
        data: tasks,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Получить задачу по ID' })
  @UseGuards(RolesGuard)
  @Roles(['INTERVIEWER', 'CANDIDATE'])
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const task = await this.taskService.findById(id)
      return {
        statusCode: HttpStatus.OK,
        message: 'Задача успешно получена',
        data: task,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Обновить задачу' })
  @UseGuards(RolesGuard)
  @Roles(['INTERVIEWER'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskService.update(id, updateTaskDto)
      return {
        statusCode: HttpStatus.OK,
        message: 'Задача успешно обновлена',
        data: task,
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Удалить задачу' })
  @UseGuards(RolesGuard)
  @Roles(['INTERVIEWER'])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.taskService.delete(id)
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Задача успешно удалена',
      }
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
