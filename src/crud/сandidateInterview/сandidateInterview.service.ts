import { Injectable } from '@nestjs/common'
import { CandidateInterviewRepository } from './сandidateInterview.repository'
import { CreateCandidateInterviewDto } from './dto/create-сandidateInterview.dto'

@Injectable()
export class CandidateInterviewService {
  constructor(
    private readonly candidateInterviewRepository: CandidateInterviewRepository
  ) {}

  async create(dto: CreateCandidateInterviewDto) {
    return await this.candidateInterviewRepository.create(dto)
  }

  async update(id: string, dto: CreateCandidateInterviewDto) {
    return await this.candidateInterviewRepository.update(id, dto)
  }

  async delete(id: string) {
    return await this.candidateInterviewRepository.delete(id)
  }

  async findAll(page?: number, limit?: number, search?: string) {
    return this.candidateInterviewRepository.findAll(page, limit, search)
  }

  async findById(id: string) {
    return this.candidateInterviewRepository.findById(id)
  }
}
