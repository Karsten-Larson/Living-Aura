import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterUser } from '../shared/RegisterUser';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  user: RegisterUser = {
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    email: '',
    password: '',
    confirmPassword: '',
  };

  @Output() userRegistered = new EventEmitter<RegisterUser>();

  submit(): void {
    this.userRegistered.emit(this.user);
  }
}
