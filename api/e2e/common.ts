import {INestApplication} from "@nestjs/common";
import {
    Test,
    TestingModule,
} from "@nestjs/testing";
import {AppModule} from "app/app.module";

/**
 * Initialize the application mock
 * @returns Initialized application
 */
export async function initApplication(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            AppModule,
        ],
    }).compile();

    const app = moduleFixture.createNestApplication();
    // app.useLogger(...);
    return app.init();
}
