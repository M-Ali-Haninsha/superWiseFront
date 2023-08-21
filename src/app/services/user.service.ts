import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  fetchCategory(): Observable<any> {
    return this.http.get<any>(this.url+'fetchCategories')
  }

  userSignupPost(data:any):Observable<any> {
    return this.http.post<any>(this.url+'userSignup', data)
  }

  userOtp(data:any):Observable<any> {
    console.log('thissssssss', data);
    
    return this.http.post<any> (this.url+ 'userOtp', {data})
  }

  userLogin(data:any):Observable<any> {
    console.log(data);
    
    return this.http.post<any> (this.url+'userLogin', data)
  }

  fetchWorkers(id:any):Observable<any> {
    return this.http.get<any> (this.url+ 'fetchWorkers/'+ id)
  }

  userViewWorkerDetails(id:string): Observable<any> {    
    return this.http.get<any> (this.url+ 'fetchWorkerDetails/'+ id)
  }

  workerHire(data: any, id:string): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+ 'hireWorker/'+id, data, requestOptions)
  }
}
