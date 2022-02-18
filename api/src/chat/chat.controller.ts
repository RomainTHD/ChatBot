import {
    Controller,
    Get,
} from "@nestjs/common";
import {Chat} from "chat/chat.entity";
import {ChatService} from "chat/chat.service";
import {Route} from "com";

@Controller("chat")
export class ChatController {
    private readonly chatService: ChatService;

    public constructor(chatService: ChatService) {
        this.chatService = chatService;
    }

    @Get()
    @Route("All chats")
    public async findAll(): Promise<Chat[]> {
        return this.chatService.findAll();
    }
}
