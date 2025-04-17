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
import { QuestionService } from '../service/question.service'
import { CreateQuestionWithGroupDto } from '../dto/create-question.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../../utils/jwtAuthGuard/jwtAuthGuard'
import { RolesGuard } from '../../../utils/roleGuard/roles.guard'
import { Roles } from '../../../utils/roleGuard/role-auth.decorator'

/**
 * Контроллер для управления вопросами.
 */
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(['HR', 'INTERVIEWER'])
@ApiTags('Вопросы')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /**
   * Создать новый вопрос.
   * @param createQuestionDto Данные для создания группы вопросов.
   */
  @ApiOperation({ summary: 'Создать новый вопрос' })
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionWithGroupDto) {
    try {
      return await this.questionService.create(createQuestionDto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Обновить данные вопроса.
   * @param id Идентификатор вопроса.
   * @param updateQuestionDto Данные для обновления группы вопросов.
   */
  @ApiOperation({ summary: 'Обновить данные вопроса' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: CreateQuestionWithGroupDto
  ) {
    try {
      return await this.questionService.update(id, updateQuestionDto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Удалить вопрос.
   * @param id Идентификатор вопроса.
   */
  @ApiOperation({ summary: 'Удалить вопрос' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.questionService.delete(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Получить список всех вопросов.
   * @param category Фильтр по категории.
   * @param userId Фильтр по ID пользователя.
   */
  @ApiOperation({ summary: 'Получить список всех вопросов' })
  @Get()
  async findAll(@Query('category') category?: string, @Query('userId') userId?: string) {
    try {
      return this.questionService.getAll(category, userId)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
