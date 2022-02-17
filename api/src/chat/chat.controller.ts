import {
    Controller,
    Get,
} from "@nestjs/common";
import {ChatService} from "chat/chat.service";

@Controller("chat")
export class ChatController {
    public constructor(private readonly chatService: ChatService) {
    }

    @Get()
    public getHello(): string {
        return this.chatService.getHello();
    }
}
