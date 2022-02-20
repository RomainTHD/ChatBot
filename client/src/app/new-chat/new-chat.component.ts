import {Component} from "@angular/core";
import {ChatService} from "app/chat/chat.service";
import {ChatDTO_toAPI} from "shared";

/**
 * This component is responsible for creating a new chat
 */
@Component({
    selector: "app-new-chat",
    templateUrl: "./new-chat.component.html",
    styleUrls: ["./new-chat.component.scss"],
})
export class NewChatComponent {
    /**
     * Current new chat
     */
    public chat: ChatDTO_toAPI;

    /**
     * Chat service
     * @private
     */
    private _chatService: ChatService;

    /**
     * Constructor
     * @param chatService Chat service
     */
    public constructor(chatService: ChatService) {
        this._chatService = chatService;

        this.chat = {
            from: "User",
            to: "AI",
            content: "",
        };
    }

    /**
     * Send the chat
     */
    public newMessage(): void {
        if (this.chat.content !== "") {
            this._chatService.sendChat(this.chat);
            this.chat.content = "";
        }
    }
}
