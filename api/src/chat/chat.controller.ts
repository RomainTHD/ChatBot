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
import {GPTBot} from "gpt";
import {
    ChatDTO_fromClient,
    ChatDTO_toClient,
} from "shared/dto";

/**
 * Chat controller
 */
@Controller("chat")
export class ChatController {
    /**
     * Chat service
     * @private
     */
    private readonly chatService: ChatService;

    /**
     * Constructor
     * @param chatService Chat service
     */
    public constructor(chatService: ChatService) {
        this.chatService = chatService;
    }

    /**
     * Get all chats
     * @returns All chats
     */
    @Get()
    @Route("All chats")
    public async findAll(): Promise<ChatDTO_toClient[]> {
        return this.chatService.findAll();
    }

    /**
     * Get a chat by its ID
     * @param id Chat ID
     * @returns Chat
     */
    @Get(":id")
    @Route("Chat by id")
    public async findByID(
        @Param("id", ParseIntPipe) id: string,
    ): Promise<ChatDTO_toClient | null> {
        return this.chatService.findByID(id);
    }

    /**
     * Creates a new chat
     * @param chat Chat to create
     * @returns Created chat
     * NOTE: For now, the returned chat is actually the OpenAI response
     */
    @Post()
    @Route("Create a chat")
    public async create(
        @Body() chat: ChatDTO_fromClient,
    ): Promise<ChatDTO_toClient | null> {
        await this.chatService.create(chat);

        const discussion = await this.chatService.getDiscussion(
            chat.from,
            chat.to,
        );

        const botResponse = await GPTBot.generateText(
            discussion,
            chat.from,
            chat.to,
        );

        return this.chatService.create({
            from: chat.to,
            to: chat.from,
            content: botResponse || "[No response]",
        });
    }

    /**
     * Fully replaces the chat with the given ID
     * @param id Chat ID
     * @param chat Chat to replace with
     * @returns The updated chat
     */
    @Put(":id")
    @Route("Update a chat, full")
    public async updateFull(
        @Param("id", ParseIntPipe) id: string,
        @Body() chat: Partial<ChatDTO_fromClient>,
    ): Promise<ChatDTO_toClient | null> {
        return this.chatService.update(id, chat);
    }

    /**
     * Partially update a chat
     * @param id Chat ID
     * @param chat Partial chat data
     * @returns Updated chat
     */
    @Patch(":id")
    @Route("Update a chat, partial")
    public async updatePart(
        @Param("id", ParseIntPipe) id: string,
        @Body() chat: Partial<ChatDTO_fromClient>,
    ): Promise<ChatDTO_toClient | null> {
        return this.chatService.update(id, chat);
    }

    /**
     * Delete a chat
     * @param id Chat ID
     * @returns Chat deleted or not
     */
    @Delete(":id")
    @Route("Delete a chat")
    public async delete(
        @Param("id", ParseIntPipe) id: string,
    ): Promise<boolean> {
        return this.chatService.delete(id);
    }
}
