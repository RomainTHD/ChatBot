/**
 * WebSocket data
 */
export interface WebSocketData {
    /**
     * Event name, like `ping` or `chat`
     */
    event: string,

    /**
     * Data
     */
    data: unknown,
}
