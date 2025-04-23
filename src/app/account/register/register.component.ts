import { Component, inject } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { RegisterUser } from '../shared/RegisterUser';
import { UserService } from '../../user.service';
import { User } from '../../shared/types/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userService = inject(UserService);
  router = inject(Router);

  register(user: RegisterUser): void {
    // Add user registration logic here
    console.log('User registered:', user);

    const newUser = new User(
      user.firstName,
      user.lastName,
      user.birthDate,
      user.email,
      user.password
    );

    this.userService.users.push(newUser);
    this.userService.currentUser.set(newUser);

    alert('Account successfully created');

    this.router.navigate(['/']);
  }
}
