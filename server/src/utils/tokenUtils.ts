import jwt from 'jsonwebtoken';
import IUserBody from '../interfaces/user.interface';
import Exception from './http.exception';

const secret = 'nn19y13b8937b1f983b7f1';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

export const createToken = (user: IUserBody) =>
  jwt.sign(user, secret, jwtConfig);

export const verifyToken = (token: string) => {
  try {
    const user = jwt.verify(token, secret, jwtConfig);
    return user;
  } catch (err) {
    throw new Exception(401, 'Invalid token');
  }
};
