import { computed, effect, Injectable, signal, Signal } from '@angular/core';
import { User } from './shared/types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
    effect(() => {
      console.log(this.currentUser());
      console.log(this.loggedIn());
    });
  }

  users: User[] = [
    new User('John', 'Doe', new Date(1990, 5, 15), 'test', '123'),
    new User(
      'John',
      'Doe',
      new Date(1990, 5, 15),
      'john.doe@example.com',
      'password123'
    ),
    new User(
      'Jane',
      'Smith',
      new Date(1985, 10, 20),
      'jane.smith@example.com',
      'securePass456'
    ),
    new User(
      'Alice',
      'Johnson',
      new Date(2000, 2, 25),
      'alice.johnson@example.com',
      'alicePass789'
    ),
    new User(
      'Bob',
      'Brown',
      new Date(1995, 7, 30),
      'bob.brown@example.com',
      'bobSecure321'
    ),
  ];

  currentUser = signal<User | null>(null);
  loggedIn: Signal<boolean> = computed(() => !!this.currentUser());

  login(email: string, password: string): boolean {
    const user = this.users.find((user) => user.email == email);

    // Email not associated with a user
    if (!user) return false;

    // User associated with password
    if (user.password === password) {
      this.currentUser.set(user);
      return true;
    }

    return false;
  }

  signout() {
    this.currentUser.set(null);
  }
}
