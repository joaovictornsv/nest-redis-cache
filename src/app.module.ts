import { Module } from '@nestjs/common';
import { PrismaService } from './config/prisma';
import { RedisService } from './config/redis';
import { AppController } from './controllers/app.controller';
import { PrismaUserRepository } from './repositories/prisma/prisma-user-repository';
import { CacheProxyUserRepository } from './repositories/proxy/proxy-user-repository';
import { RedisUserRepository } from './repositories/redis/redis-user-repository';
import {
  CacheUserRepository,
  MainUserRepository,
  UserRepository,
} from './repositories/user-repository';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    RedisService,
    {
      provide: UserRepository,
      useClass: CacheProxyUserRepository,
    },
    {
      provide: CacheUserRepository,
      useClass: RedisUserRepository,
    },
    {
      provide: MainUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}
