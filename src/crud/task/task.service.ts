import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskRepository } from './task.repository'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create(createTaskDto)
  }

  async findAll() {
    return this.taskRepository.findAll()
  }

  async runTestCode(language: string, code: string) {
    const url = 'http://localhost:3000/run'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language, code }),
    })

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`)
    }

    return await response.json()
  }

  async findById(id: string) {
    const task = await this.taskRepository.findById(id)
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return task
  }

  async update(id: string, updateTaskDto: CreateTaskDto) {
    const task = await this.findById(id)
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return this.taskRepository.update(id, updateTaskDto)
  }

  async delete(id: string) {
    const task = await this.findById(id)
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return this.taskRepository.delete(id)
  }
}
