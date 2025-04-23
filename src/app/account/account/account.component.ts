import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  userService = inject(UserService);
  router = inject(Router);

  signout() {
    this.userService.signout();
    this.router.navigate(['/']);
  }
}
