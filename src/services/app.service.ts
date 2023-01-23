import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user-repository';

@Injectable()
export class AppService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.findMany();
    return users;
  }
}
