import { Injectable, OnDestroy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth.service';
import { ChatMessage, Role } from '../models/api.models';

type Ack = { success: boolean };

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {
  private auth = inject(AuthService);
  private socket?: Socket;
  private connectedAs?: Role;

  /** Opens (or reuses) a socket authenticated as the given role. */
  connect(role: Role): void {
    if (this.socket?.connected && this.connectedAs === role) return;
    this.socket?.disconnect();
    this.socket = io(environment.API_URL, { auth: { token: this.auth.getToken(role) } });
    this.connectedAs = role;
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = undefined;
    this.connectedAs = undefined;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  /** Loads the conversation with the given person; it arrives on conversation(). */
  openConversation(recieverId: string): Observable<void> {
    return this.emit('selected worker', { recieverId });
  }

  sendMessage(message: Pick<ChatMessage, 'sender' | 'recieverId' | 'content'>): Observable<void> {
    return this.emit('sendMessageClient', message);
  }

  /** The full conversation, each time it is loaded or a message is sent/received. */
  conversation(): Observable<ChatMessage[]> {
    return new Observable<ChatMessage[]>((observer) => {
      const socket = this.requireSocket();
      const handler = (messages: ChatMessage[]) => observer.next(messages);
      socket.on('select-message', handler);
      socket.on('clientMessage', handler);
      return () => {
        socket.off('select-message', handler);
        socket.off('clientMessage', handler);
      };
    });
  }

  private emit(event: string, payload: object): Observable<void> {
    return new Observable<void>((observer) => {
      this.requireSocket().emit(event, payload, (ack: Ack) => {
        if (ack?.success) {
          observer.next();
          observer.complete();
        } else {
          observer.error(new Error('Message could not be delivered'));
        }
      });
    });
  }

  private requireSocket(): Socket {
    if (!this.socket) throw new Error('ChatService.connect() must be called first');
    return this.socket;
  }
}
