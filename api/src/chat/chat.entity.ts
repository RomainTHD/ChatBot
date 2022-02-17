import {
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm";

@Entity()
export class Chat {
    @PrimaryColumn()
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
        type: "timestamp",
    })
    public createdAt: Date;
}
