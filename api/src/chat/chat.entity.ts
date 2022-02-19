import {ChatDTO_toClient} from "shared/dto";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

/**
 * Chat entity
 */
@Entity()
export class ChatEntity {
    /**
     * Chat ID
     */
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    /**
     * From user ID
     */
    @Column()
    public from: string;

    /**
     * To user ID
     */
    @Column()
    public to: string;

    /**
     * Message content
     */
    @Column({
        type: "text",
    })
    public content: string;

    /**
     * Creation date
     */
    @Column({
        type: "int",
        default: 0,
    })
    public createdAt: number;

    /**
     * Convert to DTO
     * @param obj Chat object
     * @returns Chat DTO
     * @see ChatDTO_toClient
     */
    public static toDTO(obj: ChatEntity): ChatDTO_toClient {
        return {
            id: obj.id,
            from: obj.from,
            to: obj.to,
            content: obj.content,
            createdAt: obj.createdAt,
        };
    }
}
