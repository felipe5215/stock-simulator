import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import Exception from './http.exception';

const secret = 'nn19y13b8937b1f983b7f1';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

export const createToken = (clientId: string) =>
  jwt.sign(clientId, secret, jwtConfig);

export const verifyToken = (token: string) => {
  try {
    const user = jwt.verify(token, secret, jwtConfig);
    return user;
  } catch (err) {
    throw new Exception(401, 'Invalid token');
  }
};

export const decodeToken = (token: string) => {
  try {
    const user = jwt.decode(token);
    return user;
  } catch (err) {
    throw new Exception(401, 'Invalid token');
  }
};
