import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants/auth.constants';
import { User } from 'src/modules/user/models/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      cache: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: User, done: Function): Promise<User> {
    const user = await this.authService.validateUser({ login: payload.login });

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
