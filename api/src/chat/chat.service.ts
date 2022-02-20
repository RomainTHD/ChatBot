import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ChatEntity} from "chat/chat.entity";
import {
    ChatDTO_fromClient,
    ChatDTO_toClient,
} from "shared/dto";
import {Repository} from "typeorm";

/**
 * Chat service
 */
@Injectable()
export class ChatService {
    /**
     * Chat repository
     * @private
     */
    private readonly chatRepository: Repository<ChatEntity>;

    /**
     * ChatService constructor
     * @param chatRepository Chat ORM repository
     */
    public constructor(
        @InjectRepository(ChatEntity)
            chatRepository: Repository<ChatEntity>,
    ) {
        this.chatRepository = chatRepository;
    }

    /**
     * Get all chats
     * @returns All chats
     */
    public async findAll(): Promise<ChatDTO_toClient[]> {
        const chats = await this.chatRepository.find({
            order: {
                createdAt: "ASC",
            },
        });
        return chats.map(chat => ChatEntity.toDTO(chat));
    }

    /**
     * Get chat by id
     * @param id Chat id
     * @returns Corresponding chat
     */
    public async findByID(id: string): Promise<ChatDTO_toClient | null> {
        const chat = await this.chatRepository.findOne(id);
        if (!chat) {
            return null;
        }
        return ChatEntity.toDTO(chat);
    }

    /**
     * Create a new chat
     * @param chat Chat to create
     * @returns Created chat
     */
    public async create(
        chat: Partial<ChatDTO_fromClient>,
    ): Promise<ChatDTO_toClient> {
        return ChatEntity.toDTO(await this.chatRepository.save({
            ...chat,
            createdAt: Math.floor(Date.now() / 1000),
        }));
    }

    /**
     * Update a chat
     * @param id Id of the chat to update
     * @param chat Chat to update
     * @returns Updated chat
     */
    public async update(
        id: string,
        chat: Partial<ChatDTO_fromClient>,
    ): Promise<ChatDTO_toClient> {
        return ChatEntity.toDTO(await this.chatRepository.save(chat));
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

    /**
     * Get a discussion between two users
     * @param from From user
     * @param to To user
     * @returns Corresponding chats
     */
    public async getDiscussion(
        from: string,
        to: string,
    ): Promise<ChatEntity[]> {
        return this.chatRepository.find({
            where: [{
                from: from,
                to: to,
            }, {
                from: to,
                to: from,
            }],
            order: {
                createdAt: "ASC",
            },
        });
    }
}
