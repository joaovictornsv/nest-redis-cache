import { User } from 'src/entities/user';

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;
}

export abstract class MainUserRepository extends UserRepository {}

export abstract class CacheUserRepository extends UserRepository {
  abstract create(key: string, value: any, exp?: number): Promise<void>;
}
