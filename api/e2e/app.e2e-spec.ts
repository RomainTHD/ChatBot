import {NestExpressApplication} from "@nestjs/platform-express";
import {WsAdapter} from "@nestjs/platform-ws";
import {
    Test,
    TestingModule,
} from "@nestjs/testing";
import {AppModule} from "app/app.module";
import {WebSocketStatus} from "utils";
import * as WebSocket from "ws";

describe("WebSocket initialization", () => {
    let app: NestExpressApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useWebSocketAdapter(new WsAdapter(app));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should connect successfully", (done) => {
        const address = app.getHttpServer().listen().address();
        const socket  = new WebSocket(`ws://localhost:${address.port}`);

        socket.addEventListener("open", () => {
            socket.close(WebSocketStatus.NORMAL);
        });

        socket.on("close", (code, reason) => {
            void reason;
            expect(code).toBe(WebSocketStatus.NORMAL);
            done();
        });

        socket.addEventListener("error", (evt) => {
            socket.close(WebSocketStatus.ABNORMAL);
        });
    });
});
