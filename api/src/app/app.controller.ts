import {
    Controller,
    Get,
} from "@nestjs/common";
import {AppService} from "app/app.service";

/**
 * App controller
 */
@Controller()
export class AppController {
    /**
     * App service
     * @private
     */
    private readonly appService: AppService;

    /**
     * Constructor
     * @param appService App service
     */
    public constructor(appService: AppService) {
        this.appService = appService;
    }

    /**
     * Get root
     * @returns Hello world
     * TODO: Remove this fake route
     */
    @Get()
    public getHello(): string {
        return this.appService.getHello();
    }
}
