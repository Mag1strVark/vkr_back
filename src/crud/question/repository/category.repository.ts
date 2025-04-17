import { Injectable } from '@nestjs/common'
import { PostgresService } from '../../../db/postgres/postgres.service'
import { CreateCategoryDto } from '../dto/create-category.dto'

/**
 * Репозиторий для работы с категориями.
 */
@Injectable()
export class CategoryRepository {
  constructor(private readonly postgres: PostgresService) {}

  async create(dto: CreateCategoryDto) {
    return this.postgres.categoryQuestion.create({
      data: {
        name: dto.name,
      },
    })
  }

  async update(id: string, dto: CreateCategoryDto) {
    return this.postgres.categoryQuestion.update({
      where: { id },
      data: {
        name: dto.name,
      },
    })
  }

  async findById(id: string) {
    return this.postgres.categoryQuestion.findUnique({ where: { id } })
  }

  async delete(id: string) {
    return this.postgres.categoryQuestion.delete({ where: { id } })
  }

  async findAll() {
    return this.postgres.categoryQuestion.findMany()
  }
}
