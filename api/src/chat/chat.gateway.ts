import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import {ConfiguredWebSocket} from "com";
import {
    Server,
    WebSocket,
} from "ws";

/**
 * WebSocket Gateway for Chat
 */
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    /**
     * WebSocket server
     * @private
     */
    @WebSocketServer()
    private _ws: Server;

    /**
     * Connected clients
     * TODO: Populate the client map
     * @private
     */
    private _clients: Map<string, ConfiguredWebSocket> = new Map();

    /**
     * Called when a new connection is established
     * @param client Socket client
     */
    public async handleConnection(client: WebSocket): Promise<void> {
        const ws = new ConfiguredWebSocket(
            client,
        );

        ws.onMessage("ping", () => this.onPing(ws));
    }

    /**
     * Called when a connection is closed
     * @param client Socket client
     */
    public async handleDisconnect(client: WebSocket): Promise<void> {
        void client;
        // TODO: Remove client from map
    }

    /**
     * Called when the gateway receives a ping message
     * @param ws WebSocket
     */
    public onPing(ws: ConfiguredWebSocket): void {
        ws.send("pong");
    }
}
