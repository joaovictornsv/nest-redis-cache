import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma';
import { UserRepository } from '../user-repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    return await this.prisma.user.findMany();
  }
}
