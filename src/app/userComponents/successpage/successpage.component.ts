import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { showError } from 'src/app/core/notify';
import { Client, Payment, Worker } from 'src/app/models/api.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.css'],
  standalone: false,
})
export class SuccesspageComponent implements OnInit {
  private service = inject(UserService);

  id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  workerDetails?: Worker;
  clientDataP?: Client;
  paymentP?: Payment;

  ngOnInit(): void {
    this.service.userViewWorkerDetails(this.id).subscribe({
      next: ({ data }) => (this.workerDetails = data),
      error: (err: unknown) => showError(err),
    });
    this.service.getPaymentData(this.id).subscribe({
      next: ({ paymentData, details }) => {
        this.clientDataP = paymentData;
        this.paymentP = details;
      },
      error: (err: unknown) => showError(err),
    });
  }

  /** Prints only the receipt (see the .print-area rules in styles.css). */
  downloadPdf(): void {
    window.print();
  }
}
