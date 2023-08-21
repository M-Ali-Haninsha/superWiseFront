import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  workerSignupUrl = 'http://localhost:3000/workerSignup'
  url = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  workerSignup(data:any): Observable<any> {
    return this.http.post<any>(this.workerSignupUrl, data)
  }

  otpVerify(otp:any): Observable<any> { 
    return this.http.post<any>('http://localhost:3000/workerOtpProcess', {otp})
  }

  fetchCategory(): Observable<any> {
    return this.http.get<any> (this.url+'FetchCategory')
  }

  workerLogin(loginData: any): Observable<any>{
    console.log('lgon data', loginData);
    
    return this.http.post<any>(this.url+'workerLogin', loginData)
  }

  fetchWorkerData(): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'fetchWorkerData', requestOptions)
  }

  editPhoto(data:FormData): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url+'workerEditProfilePhoto', data, requestOptions)
  }

  editDetails(data:any): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url+'workerEditProfileData', data, requestOptions)
  }

  fetchRequests(): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'fetchUserRequest', requestOptions)
  }

  requestAccept(id:any): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url+'workAccept', id, requestOptions)
  }

  requestReject(id:any): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url+'workReject', id, requestOptions)
  }

  fetchAcceptedWorks(): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'fetchAcceptedWorks', requestOptions)
  }

}
