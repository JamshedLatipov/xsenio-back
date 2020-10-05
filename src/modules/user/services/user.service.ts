import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';

const MOCK_USERS: User[] = [
  { id: 1, fullName: 'James Bond', login: 'admin', password: '1' },
  { id: 1, fullName: 'James Bond1', login: 'admin2', password: '2' },
  { id: 1, fullName: 'James Bond2', login: 'admin3', password: '3' },
];

@Injectable()
export class UserService {

  async findOne({
    login,
  }): Promise<User | null> {
    const user = MOCK_USERS.find(data => data.login === login)
    return user;
  }

  async auth({
    login,
    password
  }): Promise<User | null> {
    const user = MOCK_USERS.find(data => data.login === login && password === data.password)
    return user;
  }
}
