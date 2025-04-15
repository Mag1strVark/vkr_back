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
import { FinalTestService } from './finalTest.service'
import { CreateFinalTestDto } from './dto/create-final-test.dto'
import { JwtAuthGuard } from '../../utils/jwtAuthGuard/jwtAuthGuard'
import { RolesGuard } from '../../utils/roleGuard/roles.guard'
import { Roles } from '../../utils/roleGuard/role-auth.decorator'

/**
 * Контроллер для управления финальными тестами (FinalTestController).
 *
 * Этот контроллер обрабатывает запросы на создание, обновление, удаление и получение тестов.
 */
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(['HR', 'INTERVIEWER'])
@ApiTags('Тест')
@Controller('finalTest')
export class FinalTestController {
  constructor(private readonly finalTestService: FinalTestService) {}

  /**
   * Создает новый финальный тест.
   *
   * @param {CreateFinalTestDto} dto - Данные для создания теста.
   * @returns {Promise<any>} - Возвращает созданный тест.
   * @throws {HttpException} - Если произошла ошибка при создании теста.
   */
  @ApiOperation({ summary: 'Создать новый тест' })
  @Post()
  async create(@Body() dto: CreateFinalTestDto) {
    try {
      return await this.finalTestService.create(dto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Обновляет данные финального теста.
   *
   * @param {string} id - ID теста для обновления.
   * @param {CreateFinalTestDto} dto - Данные для обновления теста.
   * @returns {Promise<any>} - Возвращает обновленный тест.
   * @throws {HttpException} - Если произошла ошибка при обновлении теста.
   */
  @ApiOperation({ summary: 'Обновить данные теста' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateFinalTestDto) {
    try {
      return await this.finalTestService.update(id, dto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Удаляет финальный тест.
   *
   * @param {string} id - ID теста для удаления.
   * @returns {Promise<any>} - Возвращает результат удаления.
   * @throws {HttpException} - Если произошла ошибка при удалении теста.
   */
  @ApiOperation({ summary: 'Удалить тест' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.finalTestService.delete(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Получает список всех финальных тестов.
   *
   * @param {number} page - Номер страницы для пагинации (по умолчанию 1).
   * @param {string} search - Строка для поиска по заголовкам тестов (необязательный).
   * @param {number} limit - Количество тестов на странице (по умолчанию 10).
   * @returns {Promise<any>} - Возвращает список тестов.
   * @throws {HttpException} - Если произошла ошибка при получении тестов.
   */
  @ApiOperation({ summary: 'Получить список всех тестов' })
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('counts') limit?: number
  ) {
    try {
      return await this.finalTestService.findAll(page, limit, search)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * Получает информацию о финальном тесте по ID.
   *
   * @param {string} id - ID теста для получения информации.
   * @returns {Promise<any>} - Возвращает информацию о тесте.
   * @throws {HttpException} - Если произошла ошибка при получении теста.
   */
  @ApiOperation({ summary: 'Получить информацию о тесте' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.finalTestService.findById(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
