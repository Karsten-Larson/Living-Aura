import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginUser } from '../shared/LoginUser';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: LoginUser = { email: '', password: '' };
  userService = inject(UserService);
  router = inject(Router);

  login(user: LoginUser) {
    const successfulLogin = this.userService.login(user.email, user.password);

    // redirect to homepage if the login is successful
    if (successfulLogin) {
      this.router.navigate(['/']);
    }
  }
}
