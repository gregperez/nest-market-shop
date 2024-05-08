import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  async handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // Emit the message only to the client that sent it
    // client.emit('messages-from-server', {
    //   fullName: 'Soy yo!!',
    //   message: payload.message || 'No message provided',
    // });

    // Emit the message to all connected clients, except the one that sent it
    // client.broadcast.emit('messages-from-server', {
    //   fullName: 'Someone else',
    //   message: payload.message || 'No message provided',
    // });

    this.wss.emit('messages-from-server', {
      fullName: 'Everyone',
      message: payload.message || 'No message provided',
    });
  }
}
