import { SentMessageInfo } from 'nodemailer/lib/smtp-transport'
import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import * as process from 'process'

/**
 * Сервис для отправки электронных писем.
 */
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter<SentMessageInfo>

  /**
   * Конструктор EmailService.
   * Инициализирует транспортёр для отправки писем с использованием Nodemailer.
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  /**
   * Отправить приглашение на сессию.
   * @param to Адрес электронной почты получателя.
   * @param sessionTitle Заголовок сессии.
   * @param link Ссылка на сессию.
   * @param loginInfo Информация для входа.
   * @returns Promise<void>
   */
  async sendSessionInvitation(
    to: string,
    sessionTitle: string,
    link: string,
    loginInfo: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: `Приглашение на сессию: ${sessionTitle}`,
      html: `
        <p>Вы приглашены на сессию: <strong>${sessionTitle}</strong></p>
        <p>Ссылка на сессию: <a href="${link}">${link}</a></p>
        <p>${loginInfo}</p>
      `,
    }

    await this.transporter.sendMail(mailOptions)
  }
}
