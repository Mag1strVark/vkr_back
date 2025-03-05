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

  findAll() {
    return this.postgres.task.findMany()
  }
}
