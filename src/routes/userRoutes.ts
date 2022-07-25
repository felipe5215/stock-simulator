import { Router } from 'express';
import { createUserController } from '../controllers/user/createUser';
import { userLogin } from '../controllers/user/userLogin';

const userRoutes = Router();

/**
 * @swagger
 *   /createUser:
 *    post:
 *      description: Create a new user
 *      consumes:
 *        - application/json
 *      parameters:
 *        -in: body
 *        name: user
 *        description: user to be created
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *
 *
 *
 *    responses:
 *      '200':
 *        description: successfully created user
 *      '409':
 *        description: schema provided by user is not valid
 *
 *  */

userRoutes.post('/createUser', createUserController);

userRoutes.post('/login', userLogin);

export default userRoutes;
