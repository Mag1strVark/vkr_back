import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import * as process from 'process'

@Injectable()
export class RedisService {
  private readonly redis: Redis

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    })
  }

  getRedisClient(): Redis {
    return this.redis
  }
}
