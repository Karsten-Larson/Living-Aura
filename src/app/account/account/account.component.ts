import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  user = this.authService.getUser();
}

