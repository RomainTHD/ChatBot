import {
    NextFunction,
    Request,
    Response,
} from "express";

export async function sessionValidator(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    // continues to the route if everything is alright
    next();
}
