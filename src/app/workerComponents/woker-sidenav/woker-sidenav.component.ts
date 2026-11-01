import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { WorkerSelf } from 'src/app/models/api.models';
import { ChatService } from 'src/app/services/chat.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-woker-sidenav',
  templateUrl: './woker-sidenav.component.html',
  styleUrls: ['./woker-sidenav.component.css'],
  standalone: false,
})
export class WokerSidenavComponent implements OnInit {
  private route = inject(Router);
  private service = inject(WorkerService);
  private auth = inject(AuthService);
  private chat = inject(ChatService);

  worker?: WorkerSelf;
  reqCount = 0;

  ngOnInit(): void {
    // Failures (e.g. an expired session) are handled by the interceptor.
    this.service.countData().subscribe({
      next: ({ data, lengthOfReq }) => {
        this.worker = data;
        this.reqCount = lengthOfReq;
      },
      error: () => undefined,
    });
  }

  logout(): void {
    this.auth.logout('worker');
    this.chat.disconnect();
    void this.route.navigate(['/workerLogin']);
  }
}
