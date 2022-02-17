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
     * @returns Chat[]
     */
    async findAll(): Promise<Chat[]> {
        return await this.chatRepository.find();
    }

    public getHello(): string {
        return "Hello World!";
    }
}
