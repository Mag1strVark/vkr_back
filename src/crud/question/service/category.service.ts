import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoryRepository } from '../repository/category.repository'
import { CreateCategoryDto } from '../dto/create-category.dto'

/**
 * Сервис для управления категориями.
 */
@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto) {
    return this.categoryRepository.create(dto)
  }

  async update(id: string, dto: CreateCategoryDto) {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return this.categoryRepository.update(id, dto)
  }

  async delete(id: string) {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return this.categoryRepository.delete(id)
  }

  async findAll() {
    return this.categoryRepository.findAll()
  }
}
