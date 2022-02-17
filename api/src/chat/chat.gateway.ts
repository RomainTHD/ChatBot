import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from "@nestjs/websockets";
import {Socket} from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private _ws;

    public async handleConnection(client: Socket): Promise<void> {
        void client;
        this._ws.emit("test", "connected");
    }

    public async handleDisconnect(client: Socket): Promise<void> {
        void client;
        this._ws.emit("test", "disconnected");
    }

    @SubscribeMessage("chat")
    public onChat(@MessageBody() data: string): WsResponse<string> {
        return {
            event: "chat",
            data,
        };
    }

    public afterInit(): void {
        // Empty for now
    }
}
