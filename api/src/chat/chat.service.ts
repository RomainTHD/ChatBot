import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Chat} from "chat/chat.entity";
import {Repository} from "typeorm";

@Injectable()
export class ChatService {
    private readonly chatRepository: Repository<Chat>;

    /**
     * ChatService constructor
     * @param chatRepository Chat ORM repository
     */
    public constructor(
        @InjectRepository(Chat)
            chatRepository: Repository<Chat>,
    ) {
        this.chatRepository = chatRepository;
    }

    /**
     * Get all chats
     * @returns All chats
     */
    public async findAll(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    /**
     * Get chat by id
     * @param id Chat id
     * @returns Corresponding chat
     */
    public async findByID(id: string): Promise<Chat | null> {
        const chat = await this.chatRepository.findOne(id);
        return chat ?? null;
    }

    /**
     * Create a new chat
     * @param chat Chat to create
     * @returns Created chat
     */
    public async create(chat: Partial<Chat>): Promise<Chat> {
        return this.chatRepository.save(chat);
    }

    /**
     * Update a chat
     * @param id Id of the chat to update
     * @param chat Chat to update
     * @returns Updated chat
     */
    public async update(id: string, chat: Partial<Chat>): Promise<Chat> {
        return this.chatRepository.save(chat);
    }

    /**
     * Delete a chat
     * @param id Id of the chat to delete
     * @returns Chat deleted or not
     */
    public async delete(id: string): Promise<boolean> {
        const res = await this.chatRepository.delete(id);
        return res.affected !== 0;
    }
}
