import { Controller, Get } from '@nestjs/common';
import { User } from 'src/entities/user';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  async getUsers(): Promise<User[]> {
    const users = this.appService.getUsers();
    return users;
  }
}
