import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';
import { User } from 'src/modules/user/models/user.entity';
import { IBaseResponse } from 'src/core/interfaces/base-response.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) { }


  @Post('login')
  async login(@Body() body: { login: string, password: string }): Promise<IBaseResponse<User>> {
    const result = await this._userService.auth(body);

    if (result) {
      const token = this._authService.login(result);

      return {
        code: HttpStatus.OK,
        body: {
          token,
        },
      }
    } else {
      throw new HttpException(
        {
          code: HttpStatus.UNAUTHORIZED,
          body: null,
          message: 'Incorrect login or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
