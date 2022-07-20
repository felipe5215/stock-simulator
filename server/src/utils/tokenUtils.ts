import jwt from 'jsonwebtoken';
import Exception from './http.exception';

const secret = 'nn19y13b8937b1f983b7f1';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

interface Payload {
  id: number;
  username: string;
}

export const createToken = (user: Payload) => jwt.sign(user, secret, jwtConfig);

export const verifyToken = (token: string) => {
  try {
    const user = jwt.verify(token, secret, jwtConfig);
    return user;
  } catch (err) {
    throw new Exception(401, 'Invalid token');
  }
};
