import { Injectable } from '@nestjs/common';
import { User } from './modules/user/models/user.entity';

export interface ICounter {
  counter: number;
}

@Injectable()
export class AppService {

  private _counter: Map<number, ICounter> = new Map();

  incrementCounter(user: User): ICounter {
    const count = this._counter.get(user.id)?.counter || 0;
    this._counter.set(user.id, { counter: count > 1 ? (count * 2) : 2 });

    return this._counter.get(user.id);
  }


  getCounter(user: User): ICounter {
    if (!this._counter.has(user.id)) {
      this._counter.set(user.id, { counter: 0 });
    }

    return this._counter.get(user.id);
  }


}
