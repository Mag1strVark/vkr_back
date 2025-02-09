import { RedisService } from '../../../db/redis/redis.service'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RefreshService {
  private readonly redisClient: Redis

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getRedisClient()
  }

  async saveToken(userId: string, refreshToken: string) {
    await this.redisClient.set(`refresh_token:${userId}`, refreshToken)
  }

  async findToken(userId: string) {
    return this.redisClient.get(`refresh_token:${userId}`)
  }

  async removeToken(userId: string) {
    await this.redisClient.del(`refresh_token:${userId}`)
  }
}
