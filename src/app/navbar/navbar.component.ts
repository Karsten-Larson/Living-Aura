import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: Signal<boolean>;
  userService = inject(UserService);

  ngOnInit(): void {
    this.isLoggedIn = this.userService.loggedIn;
  }
}
