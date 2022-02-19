import {config} from "dotenv";
config();
// Has to be executed before any other import because of possible side effects

import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";
import {WsAdapter} from "@nestjs/platform-ws";
import {AppModule} from "app/app.module";

(async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix("api/v1");
    app.enableCors();
    app.useWebSocketAdapter(new WsAdapter(app));
    await app.listen(process.env.API_PORT || 8080);

    console.log("Server running...");
})();
