import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';

interface ChatMessage {
  sender: string,
  senderId: string,
  timestamp: Date,
  content: string,
  reciever?:string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor() {
    this.socket = io('https://superwise.online')
   }

   public selectWorker(message:any):Observable<void> {
    return new Observable<void>((observer)=> {
      this.socket.emit('selected worker', message,(ack: {success: boolean})=>{
        console.log(ack.success);
        
        if(ack.success){
          observer.next()
          observer.complete()
        } else {
          observer.error('error')
        
        }
      })
    })
   }

   public test():Observable<void> {
    return new Observable<void>((observer)=> {
      this.socket.on('select-message',(data: any)=>{
        observer.next(data)
      })
    })
   }

   public sendMessage(message:any):Observable<void> {
    return new Observable<void>((observer)=> {
      this.socket.emit('sendMessageClient', message,(ack: {success: boolean})=>{
        console.log(ack.success);
        
        if(ack.success){
          observer.next()
          observer.complete()
        } else {
          observer.error('error')
        
        }
      })
    })
   }

   public clientMessage():Observable<void> {
    return new Observable<void>((observer)=> {
      this.socket.on('clientMessage',(data: any)=>{
        observer.next(data)
      })
    })
   }
}
