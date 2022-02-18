import {INestApplication} from "@nestjs/common";
import {
    Test,
    TestingModule,
} from "@nestjs/testing";
import {AppModule} from "app/app.module";
import * as request from "supertest";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/ (GET)", () => {
        return request(app.getHttpServer())
            .get("/api/v1/app")
            .expect(200)
            .expect("Hello World!");
    });
});