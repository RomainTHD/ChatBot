import {
    Test,
    TestingModule,
} from "@nestjs/testing";
import {ChatController} from "chat/chat.controller";
import {ChatService} from "chat/chat.service";

describe("FsController", () => {
    let controller: ChatController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [ChatService],
        }).compile();

        controller = app.get<ChatController>(ChatController);
    });

    describe("root", () => {
        it("should return 'Hello World!'", () => {
            expect(controller.getHello()).toBe("Hello World!");
        });
    });
});
