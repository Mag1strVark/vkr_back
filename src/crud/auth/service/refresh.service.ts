import { RedisService } from '../../../db/redis/redis.service'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

/**
 * Сервис для работы с токенами обновления (RefreshService).
 *
 * Этот сервис управляет сохранением, поиском и удалением токенов обновления в Redis.
 */
@Injectable()
export class RefreshService {
  private readonly redisClient: Redis

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getRedisClient()
  }

  /**
   * Сохраняет токен обновления для пользователя в Redis.
   *
   * @param {string} userId - ID пользователя, для которого сохраняется токен.
   * @param {string} refreshToken - Токен обновления, который нужно сохранить.
   */
  async saveToken(userId: string, refreshToken: string) {
    await this.redisClient.set(`refresh_token:${userId}`, refreshToken)
  }

  /**
   * Находит токен обновления для пользователя в Redis.
   *
   * @param {string} userId - ID пользователя, для которого ищется токен.
   * @returns {Promise<string | null>} - Возвращает токен обновления или null, если не найден.
   */
  async findToken(userId: string) {
    return this.redisClient.get(`refresh_token:${userId}`)
  }

  /**
   * Удаляет токен обновления для пользователя из Redis.
   *
   * @param {string} userId - ID пользователя, для которого удаляется токен.
   */
  async removeToken(userId: string) {
    await this.redisClient.del(`refresh_token:${userId}`)
  }
}
