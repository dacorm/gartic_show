import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

type PaintCoords = {
  x: number,
  y: number,
  dx: number,
  dy: number
}

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("paint")
  painting(@MessageBody() data: PaintCoords, @ConnectedSocket() socket: Socket) {
    socket.broadcast.to('test').emit("repaint", data);
  }

  handleConnection(socket: Socket) {
    socket.join('test');
  }
}