import { Injectable } from '@nestjs/common'
import { PostgresService } from '../../db/postgres/postgres.service'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TaskRepository {
  constructor(private readonly postgres: PostgresService) {}

  create(dto: CreateTaskDto) {
    return this.postgres.task.create({
      data: dto,
    })
  }

  update(id: string, dto: CreateTaskDto) {
    return this.postgres.task.update({
      where: { id },
      data: dto,
    })
  }

  findById(id: string) {
    return this.postgres.task.findUnique({ where: { id } })
  }

  delete(id: string) {
    return this.postgres.task.delete({ where: { id } })
  }

  async findAll(category?: string, userId?: string) {
    const where: any = {}

    if (category) {
      where.categoryName = category
    }

    if (userId) {
      where.userId = userId
    }

    return this.postgres.task.findMany({
      where,
    })
  }
}
