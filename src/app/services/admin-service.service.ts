import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
 
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  adminSignupUrl = 'http://localhost:3000/admin/adminLogin'
  url = 'http://localhost:3000/admin/'
  constructor(private http: HttpClient) { }

  adminSignup(data:any): Observable<any> {
    return this.http.post<any>(this.adminSignupUrl, data)
  }

  getWorkers(): Observable<any> {
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'adminGetWorker', requestOptions)
  }

  getVerifiedWorkers(): Observable<any> {
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url + 'adminVerifiedGetWorker', requestOptions)
  }

  viewProof(proof:string, options:any):Observable<any> {
    return this.http.get<any>(this.url+'adminViewProof/' + proof, options)
  }

  fetchCategory(): Observable<any> {
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'adminFetchCategory', requestOptions)
  }

  addCategory(data:any): Observable<any> {
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+'adminAddCategory', data, requestOptions)
  }

  acceptWorker(data:any): Observable<any>{
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+'adminAccept', data, requestOptions)
  }

  rejectWorker(data:any): Observable<any>{
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+'adminReject', data, requestOptions)
  }

  blockWorker(data:any):Observable<any> {
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+'adminBlockWorker', data, requestOptions)
  }

  unBlockWorker(data:any): Observable<any> {
    const item = sessionStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+'adminUnblockWorker', data, requestOptions)
  }
}
