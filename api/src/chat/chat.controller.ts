import {
    Controller,
    Get,
} from "@nestjs/common";
import {ChatService} from "chat/chat.service";

@Controller("chat")
export class ChatController {
    constructor(private readonly fsService: ChatService) {
    }

    @Get()
    getHello(): string {
        return this.fsService.getHello();
    }
}
