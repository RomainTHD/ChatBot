import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {initApplication} from "./common";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApplication();
    });

    it("/ (GET)", async () => {
        const response = await request(app.getHttpServer())
            .get("/chat")
            .expect(200);

        expect("data" in response.body).toBeTruthy();
    });

    afterAll(async () => {
        await app.close();
    });
});
