import {Logger} from "@nestjs/common";
import {nanoid} from "nanoid";
import {WebSocketData} from "shared/websocket";
import {
    CloseEvent,
    ErrorEvent,
    Event,
    MessageEvent,
    WebSocket,
} from "ws";

/**
 * WebSocket wrapper
 */
export class ConfiguredWebSocket {
    /**
     * Unique ID for this websocket
     */
    public readonly id: string;

    /**
     * WebSocket instance
     * @private
     */
    private readonly ws: WebSocket;

    /**
     * Constructor
     * @param ws WebSocket
     */
    public constructor(ws: WebSocket) {
        this.id = nanoid();
        this.ws = ws;
    }

    /**
     * On message
     * @param event Event name
     * @param cb Callback
     */
    public onMessage(
        event: string | null,
        cb: (data: unknown, event: MessageEvent) => void,
    ): void {
        this.ws.addEventListener("message", (evt) => {
            let data: WebSocketData;

            try {
                data = JSON.parse(evt.data.toString()) as WebSocketData;
            } catch (e) {
                this.ws.send(JSON.stringify({
                    event: "error",
                    data: {
                        message: "Invalid JSON packet",
                    },
                } as WebSocketData));

                Logger.debug(`Invalid WebSocket received data: ${evt.data}`);
                return;
            }

            if (event === null || data.event === event) {
                cb(data.data, evt);
            }
        });
    }

    /**
     * On close
     * @param cb Callback
     */
    public onClose(cb: (event: CloseEvent) => void): void {
        this.ws.addEventListener("close", cb);
    }

    /**
     * On error
     * @param cb Callback
     */
    public onError(cb: (event: ErrorEvent) => void): void {
        this.ws.addEventListener("error", cb);
    }

    /**
     * On open
     * @param cb Callback
     */
    public onOpen(cb: (event: Event) => void): void {
        this.ws.addEventListener("open", cb);
    }

    /**
     * Send data
     * @param event Event name
     * @param data Data to send
     */
    public send(event: string, data: unknown = {}): void {
        this.ws.send(JSON.stringify({
            event,
            data,
        }));
    }
}
