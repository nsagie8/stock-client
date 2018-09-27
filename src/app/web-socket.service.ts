import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Stock } from './models/Stock';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: SocketIOClient.Socket;
  stocksList: Stock[] = [];

  constructor() {
    this.socket = io(environment.SERVER_URL);
    this.socket.on('updateStock', (data: Stock[]) => {
      this.stocksList = data;
    });
  }
}
