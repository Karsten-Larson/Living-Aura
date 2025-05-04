import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);

  email: string = '';

  forgotPassword() {
    this.authService.forgotPassword(this.email);
    this.email = '';
  }
}
