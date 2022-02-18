import {
    IsDefined,
    IsNumber,
    IsString,
} from "class-validator";

export class ChatDTO_fromAPI {
    @IsDefined()
    @IsString()
    public id: string;

    @IsDefined()
    @IsString()
    public from: string;

    @IsDefined()
    @IsString()
    public to: string;

    @IsDefined()
    @IsString()
    public content: string;

    @IsDefined()
    @IsNumber()
    public createdAt: number;
}

export class ChatDTO_toAPI {
    @IsDefined()
    @IsString()
    public from: string;

    @IsDefined()
    @IsString()
    public to: string;

    @IsDefined()
    @IsString()
    public content: string;
}

export type ChatDTO_fromClient = ChatDTO_toAPI;
export type ChatDTO_toClient = ChatDTO_fromAPI;
