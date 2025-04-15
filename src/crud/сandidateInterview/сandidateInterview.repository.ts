import { Injectable } from '@nestjs/common'
import { PostgresService } from '../../db/postgres/postgres.service'
import { CreateCandidateInterviewDto } from './dto/create-сandidateInterview.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class CandidateInterviewRepository {
  constructor(private readonly postgres: PostgresService) {}

  async create(dto: CreateCandidateInterviewDto) {
    return this.postgres.candidateInterview.create({
      data: {
        ...dto,
      },
    })
  }

  async update(id: string, dto: CreateCandidateInterviewDto) {
    return this.postgres.candidateInterview.update({
      where: { id },
      data: {
        ...dto,
      },
    })
  }

  async delete(id: string) {
    return this.postgres.candidateInterview.delete({
      where: { id },
    })
  }

  async findAll(page: number = 1, limit: number = 10, searchTerm?: string) {
    const skip = (page - 1) * limit
    const where: Prisma.CandidateInterviewWhereInput = searchTerm
      ? {
          OR: [
            { fullName: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } },
            { position: { contains: searchTerm, mode: 'insensitive' } },
          ],
        }
      : {}

    const [items, total] = await this.postgres.$transaction([
      this.postgres.candidateInterview.findMany({
        where,
        skip,
        take: limit,
      }),
      this.postgres.candidateInterview.count({ where }),
    ])

    return {
      items,
      total,
      page,
      limit,
    }
  }

  async findById(id: string) {
    return this.postgres.candidateInterview.findUnique({
      where: { id },
    })
  }
}
