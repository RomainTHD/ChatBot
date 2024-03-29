import {
    Test,
    TestingModule,
} from "@nestjs/testing";
import {AppController} from "app/app.controller";
import {AppService} from "app/app.service";

describe("AppController", () => {
    let controller: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        controller = app.get<AppController>(AppController);
    });

    describe("basic test", () => {
        it("should return 'Hello World!'", () => {
            expect(controller.getHello()).toBe("Hello World!");
        });
    });
});
