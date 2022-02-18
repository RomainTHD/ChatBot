import {
    HttpStatus,
    INestApplication,
} from "@nestjs/common";
import "jest-extended";
import {
    ChatDTO_fromAPI,
    ChatDTO_fromClient,
} from "shared/dto";
import * as request from "supertest";
import {initApplication} from "../common";

const matchers = require("jest-extended");
expect.extend(matchers);

describe("ChatController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApplication();
    });

    it("/ (GET)", async () => {
        const response = await request(app.getHttpServer())
            .get("/chat")
            .expect(HttpStatus.OK);

        expect("data" in response.body).toBeTruthy();
    });

    it("/ (POST)", async () => {
        const fromUser = "user1";
        const toUser   = "user2";
        const message  = "Hello World!";

        const response = await request(app.getHttpServer())
            .post("/chat")
            .send({
                from: fromUser,
                to: toUser,
                content: message,
            } as ChatDTO_fromClient)
            .expect(HttpStatus.CREATED);

        expect("data" in response.body).toBeTruthy();

        const data = response.body.data as ChatDTO_fromAPI;
        expect(data.from).toBe(fromUser);
        expect(data.to).toBe(toUser);
        expect(data.content).toBe(message);
        expect(data.id).toBeString();

        const now = Math.floor(Date.now() / 1000);
        expect(now - data.createdAt).toBeWithin(0, 60);
    });

    afterAll(async () => {
        await app.close();
    });
});
