/**
 * WebSocket status
 */
export enum WebSocketStatus {
    NORMAL                     = 1000,
    GOING_AWAY                 = 1001,
    PROTOCOL_ERROR             = 1002,
    UNSUPPORTED                = 1003,
    NO_STATUS                  = 1005,
    ABNORMAL                   = 1006,
    INVALID_FRAME_PAYLOAD_DATA = 1007,
    POLICY_VIOLATION           = 1008,
    MESSAGE_TOO_BIG            = 1009,
    MISSING_EXTENSION          = 1010,
    INTERNAL_ERROR             = 1011,
    TLS_HANDSHAKE              = 1015
}
