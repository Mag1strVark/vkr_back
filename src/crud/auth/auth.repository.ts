import { PostgresService } from '../../db/postgres/postgres.service'
import { RegisterDto } from './dto/register.dto'
import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'

const SELECT_FIELDS = {
  id: true,
  email: true,
  full_name: true,
  password: true,
  role: true,
}

@Injectable()
export class AuthRepository {
  constructor(private postgres: PostgresService) {}

  login(dto: LoginDto) {
    return this.postgres.user.findFirst({
      select: SELECT_FIELDS,
      where: {
        email: dto.email,
      },
    })
  }

  register(dto: RegisterDto) {
    return this.postgres.user.create({
      select: SELECT_FIELDS,
      data: dto,
    })
  }

  findEmail(email: string) {
    return this.postgres.user.findFirst({
      select: SELECT_FIELDS,
      where: {
        email: email,
      },
    })
  }

  findId(userId: string) {
    return this.postgres.user.findFirst({
      where: {
        id: userId,
      },
    })
  }
}
