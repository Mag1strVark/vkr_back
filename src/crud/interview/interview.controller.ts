import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { InterviewService } from './interview.service'
import { CreateInterviewDto } from './dto/create-interview.dto'
import { JwtAuthGuard } from '../../utils/jwtAuthGuard/jwtAuthGuard'
import { RolesGuard } from '../../utils/roleGuard/roles.guard'
import { Roles } from '../../utils/roleGuard/role-auth.decorator'

/**
 * Контроллер для управления собеседованиями.
 */
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(['HR', 'INTERVIEWER'])
@ApiTags('Собеседования')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  /**
   * Создать новое собеседование.
   * @param dto Данные для создания собеседования.
   */
  @ApiOperation({ summary: 'Создать новое собеседование' })
  @Post()
  async create(@Body() dto: CreateInterviewDto) {
    try {
      return await this.interviewService.create(dto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Обновить данные собеседования.
   * @param id Идентификатор собеседования.
   * @param dto Данные для обновления собеседования.
   */
  @ApiOperation({ summary: 'Обновить данные собеседования' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateInterviewDto) {
    try {
      return await this.interviewService.update(id, dto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Удалить собеседование.
   * @param id Идентификатор собеседования.
   */
  @ApiOperation({ summary: 'Удалить собеседование' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.interviewService.delete(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Получить список всех собеседований.
   * @param page Номер страницы для пагинации.
   * @param search Строка для поиска по названию собеседования.
   * @param limit Количество собеседований на странице.
   */
  @ApiOperation({ summary: 'Получить список всех собеседований' })
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('counts') limit?: number
  ) {
    try {
      return await this.interviewService.findAll(page, limit, search)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Получить информацию о собеседовании по идентификатору.
   * @param id Идентификатор собеседования.
   */
  @ApiOperation({ summary: 'Получить информацию о собеседовании' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.interviewService.findById(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
