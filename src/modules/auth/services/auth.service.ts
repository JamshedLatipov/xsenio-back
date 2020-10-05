import { Injectable, HttpService } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly _http: HttpService,
  ) { }

  async validateUser(body: { login: string }): Promise<any> {
    const user = await this.userService.findOne(body);

    if (user) {
      return user;
    }

    return null;
  }

  login(user: User) {
    const payload = { id: user.id, login: user.login };
    return this.jwtService.sign(payload);
  }

}
