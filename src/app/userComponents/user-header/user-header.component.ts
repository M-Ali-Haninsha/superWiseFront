import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Client } from 'src/app/models/api.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  standalone: false,
})
export class UserHeaderComponent implements OnInit {
  private route = inject(Router);
  private service = inject(UserService);
  private auth = inject(AuthService);
  private chat = inject(ChatService);

  logged = this.auth.isLoggedIn('user');
  login = !this.logged;
  data?: Client;

  ngOnInit(): void {
    if (this.logged) {
      // A failure here (e.g. expired session) is handled by the interceptor.
      this.service.fetchUserData().subscribe({
        next: ({ fetchedData }) => (this.data = fetchedData),
        error: () => undefined,
      });
    }
  }

  signout(): void {
    this.auth.logout('user');
    this.chat.disconnect();
    this.login = true;
    this.logged = false;
    void this.route.navigate(['/']);
  }

  profile(): void {
    void this.route.navigate(['/userProfile']);
  }
}
