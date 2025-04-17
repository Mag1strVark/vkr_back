import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import * as process from 'process'

/**
 * Сервис для работы с Redis (RedisService).
 *
 * Этот сервис предоставляет клиент Redis для взаимодействия с базой данных Redis.
 */
@Injectable()
export class RedisService {
  private readonly redis: Redis // Клиент Redis

  /**
   * Конструктор для инициализации клиента Redis.
   *
   * Использует переменные окружения для получения хоста и порта Redis.
   */
  constructor() {
    // this.redis = new Redis({
    //   host: process.env.REDIS_HOST, // Хост Redis
    //   port: Number(process.env.REDIS_PORT), // Порт Redis
    // })
    this.redis = new Redis({
      host: '45.93.201.160', // Хост Redis
      port: 6379, // Порт Redis
    })
  }

  /**
   * Получает клиент Redis.
   *
   * @returns {Redis} Экземпляр клиента Redis для выполнения операций с базой данных.
   */
  getRedisClient(): Redis {
    return this.redis
  }
}
