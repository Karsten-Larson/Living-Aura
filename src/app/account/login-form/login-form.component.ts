import { Component, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginUser } from '../shared/LoginUser';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  user: LoginUser = { email: '', password: '' };

  @Output() userLoggedIn = new EventEmitter<LoginUser>();

  submit(): void {
    this.userLoggedIn.emit(this.user);
  }
}
