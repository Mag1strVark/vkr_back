import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../../utils/jwtAuthGuard/jwtAuthGuard'
import { RolesGuard } from '../../../utils/roleGuard/roles.guard'
import { Roles } from '../../../utils/roleGuard/role-auth.decorator'
import { CategoryService } from '../service/category.service'
import { CreateCategoryDto } from '../dto/create-category.dto'

/**
 * Контроллер для управления категориями.
 */
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(['HR', 'INTERVIEWER'])
@ApiTags('Вопросы')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Создать новую категорию' })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Обновить категорию' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.update(id, updateCategoryDto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Удалить категорию' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.categoryService.delete(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Получить все категории' })
  @Get()
  async findAll() {
    try {
      return await this.categoryService.findAll()
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
