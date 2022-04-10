import { User } from '../entity';
import { Secret, sign } from 'jsonwebtoken';

export const createToken = (user: User) => sign(
    {
        userId: user.id
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
        expiresIn: '30m'
    }
);