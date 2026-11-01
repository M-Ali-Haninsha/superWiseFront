import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css'],
    standalone: false
})
export class AdminHeaderComponent {
  private route = inject(Router);
  private auth = inject(AuthService);

  signout(): void {
    this.auth.logout('admin');
    void this.route.navigate(['/admin']);
  }
}
