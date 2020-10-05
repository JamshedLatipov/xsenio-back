import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService, ICounter } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  incrementCounter(@Req() request: { user: User }): ICounter {
    return this.appService.incrementCounter(request.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getCounter(@Req() request: { user: User }): ICounter {
    return this.appService.getCounter(request.user);
  }
}
