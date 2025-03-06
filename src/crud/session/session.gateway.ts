import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SessionService } from './session.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Session Gateway')
@WebSocketGateway()
export class SessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private connectedUsers: Map<string, string[]> = new Map()

  constructor(private readonly sessionService: SessionService) {}

  handleConnection(socket: Socket) {
    console.log(`Клиент подключен: ${socket.id}`)
  }

  handleDisconnect(socket: Socket) {
    console.log(`Клиент отключен: ${socket.id}`)
    this.connectedUsers.forEach((userIds, sessionId) => {
      this.connectedUsers.set(
        sessionId,
        userIds.filter((id) => id !== socket.id)
      )
      this.server.to(sessionId).emit('userDisconnected', socket.id)
    })
  }

  @ApiOperation({ summary: 'Пользователь присоединяется к сессии' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно присоединился к сессии.',
  })
  @SubscribeMessage('joinSession')
  async handleJoinSession(
    @MessageBody() data: { sessionId: string; userId: string },
    @ConnectedSocket() socket: Socket
  ) {
    const { sessionId, userId } = data

    // Добавить пользователя в сессию
    if (!this.connectedUsers.has(sessionId)) {
      this.connectedUsers.set(sessionId, [])
    }
    this.connectedUsers.get(sessionId).push(userId)

    // Присоединить сокет к комнате сессии
    socket.join(sessionId)

    // Уведомить других участников сессии
    this.server.to(sessionId).emit('userConnected', userId)
    this.server.to(sessionId).emit('currentUsers', this.connectedUsers.get(sessionId))
  }

  @ApiOperation({ summary: 'Начать сессию' })
  @ApiResponse({ status: 200, description: 'Сессия успешно начата.' })
  @SubscribeMessage('startSession')
  async handleStartSession(@MessageBody() sessionId: string) {
    await this.sessionService.startSession(sessionId)
    this.server.to(sessionId).emit('sessionStarted')
    this.server
      .to(sessionId)
      .emit('notifyParticipants', 'Сессия началась, вы можете начать редактировать код.')
  }

  @ApiOperation({ summary: 'Завершить сессию' })
  @ApiResponse({ status: 200, description: 'Сессия успешно завершена.' })
  @SubscribeMessage('endSession')
  async handleEndSession(@MessageBody() sessionId: string) {
    await this.sessionService.endSession(sessionId)
    this.server.to(sessionId).emit('sessionEnded')
  }
}
