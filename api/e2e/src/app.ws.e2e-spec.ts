import {NestExpressApplication} from "@nestjs/platform-express";
import {WsAdapter} from "@nestjs/platform-ws";
import {
    Test,
    TestingModule,
} from "@nestjs/testing";
import {AppModule} from "app/app.module";
import "jest-extended";
import {
    WebSocketData,
    WebsocketStatus,
} from "shared/websocket";
import * as WebSocket from "ws";

// eslint-disable-next-line @typescript-eslint/no-var-requires
expect.extend(require("jest-extended"));

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
        await app.getHttpServer().listen();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should connect successfully", (done) => {
        const port   = app.getHttpServer().address().port;
        const socket = new WebSocket(`ws://localhost:${port}`);

        socket.addEventListener("open", () => {
            socket.close(WebsocketStatus.NORMAL);
        });

        socket.addEventListener("close", (evt) => {
            expect(evt.code).toBe(WebsocketStatus.NORMAL);
            done();
        });

        socket.addEventListener("error", () => {
            socket.close(WebsocketStatus.ABNORMAL);
        });
    });

    it("should ping successfully", (done) => {
        const port   = app.getHttpServer().address().port;
        const socket = new WebSocket(`ws://localhost:${port}`);

        socket.addEventListener("open", () => {
            socket.send(JSON.stringify({
                event: "ping",
                data: {},
            } as WebSocketData));
        });

        socket.addEventListener("message", (evt) => {
            const data = JSON.parse(evt.data.toString()) as WebSocketData;
            expect(data.event).toBe("pong");
            expect(data.data).toBeEmptyObject();
            socket.close(WebsocketStatus.NORMAL);
        });

        socket.addEventListener("close", (evt) => {
            expect(evt.code).toBe(WebsocketStatus.NORMAL);
            done();
        });

        socket.addEventListener("error", () => {
            socket.close(WebsocketStatus.ABNORMAL);
        });
    });
});
