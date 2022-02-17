import {
    MiddlewareConsumer,
    Module,
    NestModule,
} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {sessionValidator} from "app/app.middleware";
import {ChatController} from "chat/chat.controller";
import {ChatModule} from "chat/chat.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ChatModule,
    ],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(sessionValidator)
            .forRoutes(ChatController);
    }
}
