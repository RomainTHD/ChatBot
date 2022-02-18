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
import {ChatService} from "chat/chat.service";
import {Route} from "com";
import {
    ChatDTO_fromClient,
    ChatDTO_toClient,
} from "shared/dto";

// TODO: Replace `Partial<Chat>` with a custom shared interface

@Controller("chat")
export class ChatController {
    private readonly chatService: ChatService;

    public constructor(chatService: ChatService) {
        this.chatService = chatService;
    }

    @Get()
    @Route("All chats")
    public async findAll(): Promise<ChatDTO_toClient[]> {
        return this.chatService.findAll();
    }

    @Get(":id")
    @Route("Chat by id")
    public async findByID(
        @Param("id", ParseIntPipe) id: string,
    ): Promise<ChatDTO_toClient | null> {
        return this.chatService.findByID(id);
    }

    @Post()
    @Route("Create a chat")
    public async create(
        @Body() chat: Partial<ChatDTO_fromClient>,
    ): Promise<ChatDTO_toClient | null> {
        return this.chatService.create(chat);
    }

    @Put(":id")
    @Route("Update a chat, full")
    public async updateFull(
        @Param("id", ParseIntPipe) id: string,
        @Body() chat: Partial<ChatDTO_fromClient>,
    ): Promise<ChatDTO_toClient | null> {
        return this.chatService.update(id, chat);
    }

    @Patch(":id")
    @Route("Update a chat, partial")
    public async updatePart(
        @Param("id", ParseIntPipe) id: string,
        @Body() chat: Partial<ChatDTO_fromClient>,
    ): Promise<ChatDTO_toClient | null> {
        return this.chatService.update(id, chat);
    }

    @Delete(":id")
    @Route("Delete a chat")
    public async delete(
        @Param("id", ParseIntPipe) id: string,
    ): Promise<boolean> {
        return this.chatService.delete(id);
    }
}
