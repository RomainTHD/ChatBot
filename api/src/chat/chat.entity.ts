import {ChatDTO_toClient} from "shared/dto";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ChatEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public from: string;

    @Column()
    public to: string;

    @Column({
        type: "text",
    })
    public content: string;

    @Column({
        type: "int",
        default: Math.floor(Date.now() / 1000),
    })
    public createdAt: number;

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
