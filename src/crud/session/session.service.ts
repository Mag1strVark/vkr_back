import { Injectable } from '@nestjs/common'
import { SessionRepository } from './session.repository'
import { CreateSessionDto } from './dto/create-session.dto'

@Injectable()
export class SessionService {
  constructor(private SessionRepository: SessionRepository) {}

  async createSession(dto: CreateSessionDto): Promise<void> {
    const session = await this.SessionRepository.create(dto)
    // Отправка приглашений кандидатам (можно реализовать через email или другой способ)
    await this.sendInvitations(dto.candidates, session)
  }

  private async sendInvitations(candidates: string[], session: any) {
    // Логика отправки приглашений кандидатам
    // Например, отправка email
    console.log(
      `Отправка приглашений кандидатам: ${candidates.join(', ')} на сессию ${session.title}`
    )
  }
}
