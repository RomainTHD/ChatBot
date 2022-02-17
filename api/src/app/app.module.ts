import {
    MiddlewareConsumer,
    Module,
    NestModule,
} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "app/app.controller";
import {middleware} from "app/app.middleware";
import {AppService} from "app/app.service";
import {ChatController} from "chat/chat.controller";
import {ChatModule} from "chat/chat.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "mysql",
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            dropSchema: process.env.RELEASE_MODE === "dev",
            synchronize: process.env.RELEASE_MODE !== "prod",
        }),
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [AppService, TypeOrmModule],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(middleware)
            .forRoutes(ChatController);
    }
}
