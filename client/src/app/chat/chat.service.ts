import {Injectable} from "@angular/core";
import {ApiHttpClient} from "app/com";
import {
    Observable,
    ReplaySubject,
} from "rxjs";
import {
    ChatDTO_fromAPI,
    ChatDTO_toAPI,
    RestData,
} from "shared";

/**
 * Chat service
 */
@Injectable({
    providedIn: "root",
})
export class ChatService {
    /**
     * Chat stream
     */
    public chatStream;

    /**
     * HTTP service
     * @private
     */
    private _http: ApiHttpClient;

    /**
     * Constructor
     * @param http HTTP service
     */
    public constructor(http: ApiHttpClient) {
        this.chatStream = new ReplaySubject<ChatDTO_toAPI>(1);
        this._http      = http;
    }

    /**
     * Get all chats
     * @returns API data with all chats
     */
    public getAllChats(): Observable<RestData<ChatDTO_fromAPI[]>> {
        return this._http.get<RestData<ChatDTO_fromAPI[]>>("/chat");
    }

    /**
     * Send a chat
     * @param chat Chat to send
     */
    public sendChat(chat: ChatDTO_toAPI): void {
        this._emitNewChat({
            ...chat,
        });

        this._http.post<RestData<ChatDTO_fromAPI>>("/chat", chat).subscribe(
            (res) => {
                this._emitNewChat(res.data);
            },
        );
    }

    /**
     * Emit a new chat
     * @param chat Chat to emit
     * @private
     */
    private _emitNewChat(chat: ChatDTO_toAPI): void {
        this.chatStream.next(chat);
    }
}
