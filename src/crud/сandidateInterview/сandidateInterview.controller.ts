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
import { CandidateInterviewService } from './сandidateInterview.service'
import { CreateCandidateInterviewDto } from './dto/create-сandidateInterview.dto'
import { JwtAuthGuard } from '../../utils/jwtAuthGuard/jwtAuthGuard'
import { RolesGuard } from '../../utils/roleGuard/roles.guard'
import { Roles } from '../../utils/roleGuard/role-auth.decorator'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(['HR', 'INTERVIEWER'])
@ApiTags('Кандидаты на собеседование')
@Controller('candidateInterview')
export class CandidateInterviewController {
  constructor(private readonly candidateInterviewService: CandidateInterviewService) {}

  @ApiOperation({ summary: 'Создать нового кандидата на собеседование' })
  @Post()
  async create(@Body() dto: CreateCandidateInterviewDto) {
    try {
      return await this.candidateInterviewService.create(dto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Обновить данные кандидата на собеседование' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateCandidateInterviewDto) {
    try {
      return await this.candidateInterviewService.update(id, dto)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Удалить кандидата на собеседование' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.candidateInterviewService.delete(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Получить список всех кандидатов на собеседование' })
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string
  ) {
    try {
      return await this.candidateInterviewService.findAll(page, limit, search)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  @ApiOperation({ summary: 'Получить информацию о кандидате на собеседование' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.candidateInterviewService.findById(id)
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
