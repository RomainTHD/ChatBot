import {
    MiddlewareConsumer,
    Module,
    NestModule,
} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {
    TypeOrmModule,
    TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import {AppController} from "app/app.controller";
import {middleware} from "app/app.middleware";
import {AppService} from "app/app.service";
import {ChatController} from "chat/chat.controller";
import {ChatModule} from "chat/chat.module";

let ormOptions: TypeOrmModuleOptions;
if (process.env.E2E_TESTING_ENABLED === "true" || !process.env.RELEASE_MODE) {
    // FIXME: Workaround for Google Cloud deployment
    ormOptions = {
        type: "better-sqlite3",
        database: ":memory:",
        autoLoadEntities: true,
        dropSchema: true,
        synchronize: true,
    };
} else {
    ormOptions = {
        type: "mysql",
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        dropSchema: process.env.RELEASE_MODE === "dev",
        synchronize: process.env.RELEASE_MODE !== "prod",
    };
}

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(ormOptions),
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
