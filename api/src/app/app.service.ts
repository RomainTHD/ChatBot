import {Injectable} from "@nestjs/common";

/**
 * App service
 */
@Injectable()
export class AppService {
    /**
     * Example method
     * TODO: Remove this method
     * @returns Hello world
     */
    public getHello(): string {
        return "Hello World!";
    }
}
