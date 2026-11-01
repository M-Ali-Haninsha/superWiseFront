import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { showError } from 'src/app/core/notify';
import { Client, Payment, Worker } from 'src/app/models/api.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-view-history',
  templateUrl: './single-view-history.component.html',
  styleUrls: ['./single-view-history.component.css'],
  standalone: false,
})
export class SingleViewHistoryComponent implements OnInit {
  private service = inject(UserService);

  id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  paymentDetails?: Payment;
  clientData?: Client;
  workerData?: Worker;

  ngOnInit(): void {
    this.service.historyDetails(this.id).subscribe({
      next: ({ payments, clientData, workerData }) => {
        this.paymentDetails = payments[0];
        this.clientData = clientData;
        this.workerData = workerData;
      },
      error: (err: unknown) => showError(err),
    });
  }

  /** Prints only the receipt (see the .print-area rules in styles.css). */
  downloadPdf(): void {
    window.print();
  }
}
