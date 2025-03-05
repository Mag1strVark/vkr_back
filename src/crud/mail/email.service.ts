import { SentMessageInfo } from 'nodemailer/lib/smtp-transport'
import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import * as process from 'process'

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter<SentMessageInfo>

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendSessionInvitation(
    to: string,
    sessionTitle: string,
    link: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: `Приглашение на сессию: ${sessionTitle}`,
      html: `
      <p>Вы приглашены на сессию: <strong>${sessionTitle}</strong></p>
      <p>Ссылка на сессию: <a href="${link}">${link}</a></p>
      `,
    }

    await this.transporter.sendMail(mailOptions)
  }
}
