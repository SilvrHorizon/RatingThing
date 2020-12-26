import { Session } from "express-session";
import { User } from "../entities/user.entity";
import { currentUserFetcher } from "../utils/currentUserFetcher";


export type myContext = {
    session: any,
    req: any,
    userId?: number;
    userUtils: currentUserFetcher;
}
