import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  user!: User | null;

  ngOnInit(): void {
    if (!this.authService.loggedIn()) {
      this.router.navigate(['/login']);
    }

    this.user = this.authService.user();
  }

  logout() {
    this.authService.logout();

    alert('Successfully logged out');

    this.router.navigate(['/login']);
  }
}
