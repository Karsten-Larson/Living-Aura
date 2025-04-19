import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  loggedIn: Signal<boolean> = signal(Math.random() < 0.5);
}
