import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {initApplication} from "../common";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApplication();
    });

    it("/ (GET)", async () => {
        await request(app.getHttpServer())
            .get("/")
            .expect(200)
            .expect("Hello World!");
    });

    afterAll(async () => {
        await app.close();
    });
});
