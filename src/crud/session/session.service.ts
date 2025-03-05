import { Injectable } from '@nestjs/common'
import { SessionRepository } from './session.repository'
import { CreateSessionDto } from './dto/create-session.dto'
import { EmailService } from '../mail/email.service'

@Injectable()
export class SessionService {
  constructor(
    private sessionRepository: SessionRepository,
    private emailService: EmailService
  ) {}

  async createSession(dto: CreateSessionDto) {
    const session = await this.sessionRepository.create(dto)
    await this.sendInvitations(dto.candidates, session)
    await this.sendInvitations(dto.employees, session)
  }

  async updateSession(id: string, dto: CreateSessionDto) {
    return this.sessionRepository.update(id, dto)
  }

  async deleteSession(id: string) {
    return this.sessionRepository.delete(id)
  }

  private async sendInvitations(emails: string[], session: any) {
    const link = `https://your-platform.com/sessions/${session.id}`
    for (const email of emails) {
      await this.emailService.sendSessionInvitation(email, session.title, link)
    }
  }
}
