import {
    IsDefined,
    IsNumber,
    IsString,
} from "class-validator";

/**
 * Chat DTO sent by the API
 */
export class ChatDTO_fromAPI {
    /**
     * Chat ID
     */
    @IsDefined()
    @IsString()
    public id!: string;

    /**
     * From user ID
     */
    @IsDefined()
    @IsString()
    public from!: string;

    /**
     * To user ID
     */
    @IsDefined()
    @IsString()
    public to!: string;

    /**
     * Message content
     */
    @IsDefined()
    @IsString()
    public content!: string;

    /**
     * Message creation date
     */
    @IsDefined()
    @IsNumber()
    public createdAt!: number;
}

/**
 * Chat DTO received by the API
 */
export class ChatDTO_toAPI {
    /**
     * From user ID
     */
    @IsDefined()
    @IsString()
    public from!: string;

    /**
     * To user ID
     */
    @IsDefined()
    @IsString()
    public to!: string;

    /**
     * Message content
     */
    @IsDefined()
    @IsString()
    public content!: string;
}

/**
 * Chat DTO sent by the client
 */
export type ChatDTO_fromClient = ChatDTO_toAPI;

/**
 * Chat DTO received by the client
 */
export type ChatDTO_toClient = ChatDTO_fromAPI;
