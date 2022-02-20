import {
    AfterViewChecked,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from "@angular/core";
import {ChatService} from "app/chat";
import {ApiHttpClient} from "app/com";
import {ChatDTO_fromClient} from "shared";

/**
 * Chat list component
 */
@Component({
    selector: "app-chat-list",
    templateUrl: "./chat-list.component.html",
    styleUrls: ["./chat-list.component.scss"],
})
export class ChatListComponent implements OnInit, AfterViewChecked {
    /**
     * Chat list
     */
    public chats: ChatDTO_fromClient[];

    /**
     * Scroll container, to always scroll to the bottom
     * @private
     */
    @ViewChild("scrollContainer")
    private _scrollContainer!: ElementRef;

    /**
     * Chat service
     * @private
     */
    private _chatService: ChatService;

    /**
     * HTTP service
     * @private
     */
    private _http: ApiHttpClient;

    /**
     * Constructor
     * @param chatService Chat service
     * @param http HTTP service
     */
    public constructor(
        chatService: ChatService,
        http: ApiHttpClient,
    ) {
        this.chats = [];

        this._chatService = chatService;
        this._http        = http;
    }

    /**
     * On init
     */
    public ngOnInit(): void {
        this._chatService.chatStream.subscribe((evt) => {
            this._newChatEventHandler(evt);
        });

        this._chatService.getAllChats().subscribe((res) => {
            res.data.forEach((chat) => {
                this.chats.push(chat);
            });
        });
    }

    /**
     * On view checked, allow scrolling to the bottom
     */
    public ngAfterViewChecked(): void {
        try {
            this._scrollContainer.nativeElement.scrollTop = this._scrollContainer.nativeElement.scrollHeight;
        } catch (ignored) {
            // Ignored
        }
    }

    /**
     * New chat event handler
     * @param newChat New chat
     * @private
     */
    private _newChatEventHandler(newChat: ChatDTO_fromClient): void {
        this.chats.push(newChat);
    }
}
