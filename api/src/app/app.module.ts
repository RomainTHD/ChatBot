import {
    MiddlewareConsumer,
    Module,
    NestModule,
} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {
    ThrottlerGuard,
    ThrottlerModule,
} from "@nestjs/throttler";
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
        dropSchema: process.env.RELEASE_MODE === "debug",
        synchronize: process.env.RELEASE_MODE !== "prod",
    };
}

/**
 * The main module of the application
 */
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(ormOptions),
        ThrottlerModule.forRoot({
            limit: 120,
            ttl: 60,
        }),
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
    }],
    exports: [AppService, TypeOrmModule],
})
export class AppModule implements NestModule {
    /**
     * Configures the middleware of the module
     * @param consumer Middleware consumer
     */
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(middleware)
            .forRoutes(ChatController);
    }
}
