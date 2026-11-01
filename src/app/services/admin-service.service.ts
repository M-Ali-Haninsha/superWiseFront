import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { asRole } from '../core/http';
import {
  AdminWorker,
  Category,
  Client,
  Complaint,
  DoneResponse,
  LoginRequest,
  LoginResponse,
  WorkerWithIncome,
  WorkersPerCategory,
} from '../models/api.models';

const asAdmin = asRole('admin');

@Injectable({ providedIn: 'root' })
export class AdminServiceService {
  private http = inject(HttpClient);
  private url = environment.ADMIN_URL;

  adminLogin(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + 'adminLogin', data);
  }

  getWorkers(): Observable<{ workers: AdminWorker[] }> {
    return this.http.get<{ workers: AdminWorker[] }>(this.url + 'adminGetWorker', asAdmin);
  }

  getVerifiedWorkers(): Observable<{ workers: AdminWorker[] }> {
    return this.http.get<{ workers: AdminWorker[] }>(this.url + 'adminVerifiedGetWorker', asAdmin);
  }

  /** A short-lived link to the worker's private ID proof. */
  viewProof(workerId: string): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(this.url + 'adminViewProof/' + workerId, asAdmin);
  }

  fetchCategory(): Observable<{ recievedCat: Category[] }> {
    return this.http.get<{ recievedCat: Category[] }>(this.url + 'adminFetchCategory', asAdmin);
  }

  addCategory(data: FormData): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'adminAddCategory', data, asAdmin);
  }

  editCategory(data: FormData, id: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'editCategory/' + id, data, asAdmin);
  }

  acceptWorker(email: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'adminAccept', { email }, asAdmin);
  }

  rejectWorker(email: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'adminReject', { email }, asAdmin);
  }

  blockWorker(id: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'adminBlockWorker', { id }, asAdmin);
  }

  unBlockWorker(id: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'adminUnblockWorker', { id }, asAdmin);
  }

  fetchUser(): Observable<{ user: Client[] }> {
    return this.http.get<{ user: Client[] }>(this.url + 'adminFetchUsers', asAdmin);
  }

  blockUser(id: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'adminBlockUser', { id }, asAdmin);
  }

  unBlockUser(id: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'adminUnblockUser', { id }, asAdmin);
  }

  getIncomeData(): Observable<{ income: number }> {
    return this.http.get<{ income: number }>(this.url + 'getIncome', asAdmin);
  }

  countDetails(): Observable<{ workerCount: number; clientCount: number; workerData: WorkerWithIncome[] }> {
    return this.http.get<{ workerCount: number; clientCount: number; workerData: WorkerWithIncome[] }>(
      this.url + 'countDetails',
      asAdmin,
    );
  }

  chartValue(): Observable<WorkersPerCategory[]> {
    return this.http.get<WorkersPerCategory[]>(this.url + 'getChartValue', asAdmin);
  }

  getComplaints(): Observable<{ complaints: Complaint[] }> {
    return this.http.get<{ complaints: Complaint[] }>(this.url + 'getComplaints', asAdmin);
  }
}
