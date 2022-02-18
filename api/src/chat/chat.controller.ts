import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
} from "@nestjs/common";
import {Chat} from "chat/chat.entity";
import {ChatService} from "chat/chat.service";
import {Route} from "com";

// TODO: Replace `Partial<Chat>` with a custom shared interface

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

    @Get(":id")
    @Route("Chat by id")
    async findByID(
        @Param("id", ParseIntPipe) id: string,
    ): Promise<Chat | null> {
        return this.chatService.findByID(id);
    }

    @Post(":id")
    @Route("Create a chat")
    async create(
        @Param("id", ParseIntPipe) id: string,
        @Body() chat: Partial<Chat>,
    ): Promise<Chat | null> {
        return this.chatService.create(chat);
    }

    @Put(":id")
    @Route("Update a chat, full")
    async updateFull(
        @Param("id", ParseIntPipe) id: string,
        @Body() chat: Partial<Chat>,
    ): Promise<Chat | null> {
        return this.chatService.update(id, chat);
    }

    @Patch(":id")
    @Route("Update a chat, partial")
    async updatePart(
        @Param("id", ParseIntPipe) id: string,
        @Body() chat: Partial<Chat>,
    ): Promise<Chat | null> {
        return this.chatService.update(id, chat);
    }

    @Delete(":id")
    @Route("Delete a chat")
    async delete(
        @Param("id", ParseIntPipe) id: string,
    ): Promise<boolean> {
        return this.chatService.delete(id);
    }
}
