import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import {
  CacheUserRepository,
  MainUserRepository,
  UserRepository,
} from '../user-repository';

@Injectable()
export class CacheProxyUserRepository implements UserRepository {
  constructor(
    private readonly cacheRepository: CacheUserRepository,
    private readonly mainRepository: MainUserRepository,
  ) {}

  async findMany(): Promise<User[]> {
    const cacheUsers = await this.cacheRepository.findMany();

    if (!cacheUsers) {
      const users = await this.mainRepository.findMany();

      await this.cacheRepository.create('users', users, 10);

      console.log('\x1b[33m%s\x1b[0m', 'From Database');
      return users;
    }

    console.log('\x1b[36m%s\x1b[0m', 'From Cache');
    return cacheUsers;
  }
}
