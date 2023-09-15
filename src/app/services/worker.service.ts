import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private url = environment.USER_URL

  constructor(private http: HttpClient) { }

  workerSignup(data:any): Observable<any> {
    return this.http.post<any>(this.url+'workerSignup', data)
  }

  otpVerify(otp:any): Observable<any> { 
    return this.http.post<any>(this.url+'workerOtpProcess', {otp})
  }

  fetchCategory(): Observable<any> {
    return this.http.get<any> (this.url+'FetchCategory')
  }

  workerLogin(loginData: any): Observable<any>{    
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

  editDescription(data:any): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any> (this.url+'updateDescription', data, requestOptions)
  }

  showProgress(id:string) {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'viewProgress/'+id, requestOptions)
  }

  updateProgress(clientId:string, progress:number): Observable<any> {    
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any> (this.url+'updateWorkProgress/'+ clientId, {progress}, requestOptions)
  }

  postAmount(clientId:string, data:FormData): Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+'postAmount/'+ clientId, data, requestOptions)
  }

  pushImage(clientId:string, images:any):Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+'pushImages/'+ clientId, images ,requestOptions)
  }

  countData():Observable<any> {
    const item = 'workerValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'getCount', requestOptions)
  }

}
