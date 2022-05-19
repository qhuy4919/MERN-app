
import { Request, Response } from 'express';
import { UserAuthPayload } from './user';

export interface Context {
    req: Request,
    res: Response,
    user: Pick<UserAuthPayload, 'userId'>
}