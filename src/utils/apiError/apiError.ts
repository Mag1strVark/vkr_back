import { HttpStatus } from '@nestjs/common'

export class ApiError extends Error {
  status: number
  errors: any[]

  constructor(status: number, message: string, errors: any[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(HttpStatus.UNAUTHORIZED, 'Пользователь не авторизован')
  }

  static BadRequest(message: string, errors: any[] = []): ApiError {
    return new ApiError(HttpStatus.BAD_REQUEST, message, errors)
  }

  static NotFound(message: string, errors: any[] = []): ApiError {
    return new ApiError(HttpStatus.NOT_FOUND, message, errors)
  }
}
