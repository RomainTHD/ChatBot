import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChatController} from "chat/chat.controller";
import {Chat} from "chat/chat.entity";
import {ChatService} from "chat/chat.service";

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService, TypeOrmModule],
})
export class ChatModule {
}
