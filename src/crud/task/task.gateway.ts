import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { TaskService } from './task.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

interface IData {
  sessionId: string
  userId: string
  language: string
  code: string
  cursorPosition?: number
}

@ApiTags('Task Gateway')
@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer() server: Server

  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Изменение кода в сессии' })
  @ApiResponse({ status: 200, description: 'Код успешно изменен.' })
  @SubscribeMessage('sessionChangeCode')
  async handleChangedCode(@MessageBody() data: IData) {
    this.server.to(data.sessionId).emit('change-code', data)
  }

  @ApiOperation({ summary: 'Запуск теста кода' })
  @ApiResponse({ status: 200, description: 'Тест кода успешно выполнен.' })
  @SubscribeMessage('codeRunTest')
  async handleCodeRunTest(@MessageBody() data: IData) {
    const result = await this.taskService.runTestCode(data.language, data.code)
    this.server.to(data.sessionId).emit('test-code', result)
  }

  @ApiOperation({ summary: 'Обновление позиции курсора' })
  @ApiResponse({ status: 200, description: 'Позиция курсора успешно обновлена.' })
  @SubscribeMessage('updateCursor')
  handleUpdateCursor(
    @MessageBody() data: { sessionId: string; userId: string; cursorPosition: number }
  ) {
    this.server.to(data.sessionId).emit('cursorUpdate', {
      userId: data.userId,
      cursorPosition: data.cursorPosition,
    })
  }
}
