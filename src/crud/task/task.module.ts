import { Module } from '@nestjs/common'
import { TaskController } from './task.controller'
import { TaskRepository } from './task.repository'
import { TaskService } from './task.service'
import { TaskGateway } from './task.gateway'

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, TaskGateway],
})
export class TaskModule {}
