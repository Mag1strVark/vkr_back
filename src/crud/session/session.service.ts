import { Injectable, NotFoundException } from '@nestjs/common'
import { SessionRepository } from './session.repository'
import { CreateSessionDto, ParticipantDto } from './dto/create-session.dto'
import { EmailService } from '../mail/email.service'
import { FilterSessionsDto } from './dto/filter-sessions.dto'
import { AuthRepository } from '../auth/auth.repository'

@Injectable()
export class SessionService {
  constructor(
    private sessionRepository: SessionRepository,
    private authRepository: AuthRepository,
    private emailService: EmailService
  ) {}

  async getSessions(filter: FilterSessionsDto, userRole: string, userId: string) {
    const { page = 1, pageSize = 10 } = filter
    const skip = (page - 1) * pageSize

    let sessions: any
    if (userRole === 'HR') {
      sessions = this.sessionRepository.findAll(filter, skip, pageSize)
    } else if (userRole === 'INTERVIEWER') {
      sessions = this.sessionRepository.findByInterviewerId(
        userId,
        filter,
        skip,
        pageSize
      )
    }

    const total = this.sessionRepository.count(filter)

    return {
      total,
      page,
      pageSize,
      sessions,
    }
  }

  async addTasksToSession(sessionId: string, taskIds: string[]) {
    const session = await this.sessionRepository.findById(sessionId)
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`)
    }

    return this.sessionRepository.addTasks(sessionId, taskIds)
  }

  async createSession(dto: CreateSessionDto) {
    const session = await this.sessionRepository.create(dto)
    const userCredentials = await this._getUserCredentials(dto.participants)
    await this._sendInvitations(dto.participants, session, userCredentials)
  }

  async updateSession(id: string, dto: CreateSessionDto) {
    return this.sessionRepository.update(id, dto)
  }

  async deleteSession(id: string) {
    return this.sessionRepository.delete(id)
  }

  async getSessionById(id: string) {
    return this.sessionRepository.findById(id)
  }

  async startSession(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId)
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`)
    }
    await this.sessionRepository.updateActive(sessionId, true)
  }

  async endSession(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId)
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`)
    }
    await this.sessionRepository.updateActive(sessionId, true)
  }

  private async _sendInvitations(
    participants: ParticipantDto[],
    session: any,
    userCredentials: { [key: string]: { login: string; password: string } }
  ) {
    const link = `https://your-platform.com/sessions/${session.id}`

    for (const participant of participants) {
      const credentials = userCredentials[participant.email]
      const loginInfo = credentials
        ? `Логин: ${credentials.login}, Пароль: ${credentials.password}`
        : ''

      await this.emailService.sendSessionInvitation(
        participant.email,
        session.title,
        link,
        loginInfo
      )
    }
  }

  private async _getUserCredentials(
    participants: ParticipantDto[]
  ): Promise<{ [key: string]: { login: string; password: string } }> {
    const credentials = {}
    for (const participant of participants) {
      const email = participant.email
      const user = await this.authRepository.findEmail(email)
      if (user) {
        credentials[email] = { login: email, password: user.password }
      } else {
        const newPassword = this._generatePassword(6)
        const candidate = await this.authRepository.register({
          email,
          password: newPassword,
          full_name: user.full_name,
          role: 'CANDIDATE',
        })
        credentials[candidate.email] = {
          login: candidate.email,
          password: candidate.password,
        }
      }
    }
    return credentials
  }

  private _generatePassword(length: number): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?'
    let password = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }

    return password
  }
}
