import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {
  cart$: Subject<any> = new BehaviorSubject<any>([]);
  constructor() { }

}
