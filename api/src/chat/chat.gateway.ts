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

/**
 * WebSocket Gateway for Chat
 */
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    /**
     * WebSocket server
     * @private
     */
    @WebSocketServer()
    private _ws;

    /**
     * Called when a new connection is established
     * @param client Socket client
     */
    public async handleConnection(client: Socket): Promise<void> {
        void client;
        this._ws.emit("test", "connected");
    }

    /**
     * Called when a connection is closed
     * @param client Socket client
     */
    public async handleDisconnect(client: Socket): Promise<void> {
        void client;
        this._ws.emit("test", "disconnected");
    }

    /**
     * Called when the gateway receives a chat message
     * @param data Message data
     * @returns WebSocket response
     */
    @SubscribeMessage("chat")
    public onChat(@MessageBody() data: string): WsResponse<string> {
        return {
            event: "chat",
            data,
        };
    }

    /**
     * Called when the gateway is initialized
     */
    public afterInit(): void {
        // Empty for now
    }
}
