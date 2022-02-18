import {
    Test,
    TestingModule,
} from "@nestjs/testing";
import {ChatController} from "chat/chat.controller";
import {ChatService} from "chat/chat.service";

describe("ChatController", () => {
    let controller: ChatController;
    let service: ChatService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [{
                provide: ChatService,
                useValue: {
                    getAll: jest.fn(),
                    getById: jest.fn(),
                    create: jest.fn(),
                    update: jest.fn(),
                    delete: jest.fn(),
                },
            }],
        }).compile();

        service    = app.get<ChatService>(ChatService);
        controller = app.get<ChatController>(ChatController);

        void service;
        void controller;
    });

    describe("basic test", () => {
        it("should be implemented", () => {
            expect(true).toBeTrue();
        });
    });
});
