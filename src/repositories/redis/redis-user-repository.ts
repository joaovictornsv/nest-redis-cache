import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis';
import { User } from 'src/entities/user';
import { CacheUserRepository } from '../user-repository';

@Injectable()
export class RedisUserRepository implements CacheUserRepository {
  constructor(private readonly redis: RedisService) {}

  async findMany(): Promise<User[]> {
    const users = await this.redis.get('users');
    if (!users) return null;

    return JSON.parse(users);
  }

  async create(key: string, value: any, exp?: number) {
    const stringValue = JSON.stringify(value);
    await this.redis.set(key, stringValue, 'EX', exp);
  }
}
