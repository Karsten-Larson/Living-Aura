import { Component, inject } from '@angular/core';
import { AuthService, UserInfo } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: UserInfo = {
    fname: '',
    lname: '',
    email: '',
    password: '',
  };

  private authService = inject(AuthService);

  register() {
    if (this.user.fname == '') {
      alert('Please enter your first name');
      return;
    }
    if (this.user.lname == '') {
      alert('Please enter your Last name');
      return;
    }

    if (this.user.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.user.password == '') {
      alert('Please enter your password');
      return;
    }

    this.authService.register(this.user);
    this.user = {
      fname: '',
      lname: '',
      email: '',
      password: '',
    };
  }
}
