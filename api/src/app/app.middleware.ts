import {
    NextFunction,
    Request,
    Response,
} from "express";

/**
 * Aoo middleware
 * @param req Request
 * @param res Response
 * @param next Next callback
 */
export async function middleware(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    // continues to the route if everything is alright
    next();
}
