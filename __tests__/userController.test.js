import request from 'supertest';
import express from 'express';

import userController from '../src/controllers/userController';
import userModel from '../src/models/user';

const app = express();
app.use(express.json());

jest.mock('../src/models/user');

const publicRoute = '/api/public';

app.get(publicRoute + '/users', userController.getUsers);
app.get(publicRoute + '/users/:id', userController.getUser);
app.post(publicRoute + '/users', userController.createUser);
app.put(publicRoute + '/users/:id', userController.updateUser);
app.delete(publicRoute + '/users/:id', userController.deleteUser);


const mockUsers = [
    {
        "created_at": "2024-10-14T00:51:36+00:00",
        "created_by": "dude",
        "email": "reyseb@correo.com",
        "id": 1,
        "last_name": "Rey",
        "name": "sebastian",
        "role": 1,
        "username": "admin"
    },
];

const dontFounUserResponse = { message: 'Usuario no encontrado' };

describe('User controllers', () => {
    beforeEach(() => {
        userModel.getAllUsers.mockClear();
        userModel.getUserById.mockClear();
        userModel.createUser.mockClear();
        userModel.updateUser.mockClear();
        // userModel.deleteUser.mockClear();
    });

    //--------------------------------- GET
    test('GET /api/public/users should return all users', async () => {
        userModel.getAllUsers.mockReturnValue(mockUsers);

        const response = await request(app).get(publicRoute + '/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockUsers);;
    });

    test('GET /api/public/users/:id should return a single user', async () => {
        userModel.getUserById.mockResolvedValue(mockUsers[0]);

        const response = await request(app).get(publicRoute + '/users/1');
        expect(response.statusCode).toBe(200);
        // expect(response.body).toEqual(mockUsers[0]);
    });

    test('GET /api/public/users/:id - should return 404 if user does not exist', async () => {
        userModel.getUserById.mockResolvedValue(null);

        const response = await request(app).get(publicRoute + '/users/35');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(dontFounUserResponse);
    });

    //--------------------------------- CREATE
    test('POST /api/public/users should create a new user', async () => {
        const newUser = { name: 'Alice Smith', email: 'alice@example.com' };
        userModel.createUser.mockReturnValue({ id: 3, ...newUser });

        const response = await request(app).post(publicRoute + '/users').send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ id: 3, ...newUser });
    });

    //--------------------------------- PUT
    test('PUT /api/public/users/:id should update a user', async () => {
        const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };
        userModel.updateUser.mockReturnValue({ id: 1, ...updatedUser });

        const response = await request(app).put(publicRoute + '/users/1').send(updatedUser);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ id: 1, ...updatedUser });
    });

    test('PUT /api/public/users/:id - should return 404 if user do not exist', async () => {
        const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };
        userModel.updateUser.mockReturnValue({
            success: false,
            message: 'Usuario no encontrado',
        });
        const response = await request(app).put(publicRoute + '/users/17').send(updatedUser);
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(dontFounUserResponse);
    });

    // //--------------------------------- DELETE
    // test('DELETE /api/public/users/:id should delete a user', async () => {
    //     const deletedUser = { name: 'John Updated', email: 'john.updated@example.com' };
    //     userModel.deleteUser.mockReturnValue({ id: 1, ...deletedUser });

    //     const response = await request(app).delete(publicRoute + '/users/1').send(deletedUser);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toEqual({ id: 1, ...deletedUser });
    // });

    // test('DELETE /api/public/users/:id - should return 404 if user do not exist', async () => {
    //     userModel.deleteUser.mockReturnValue(null);
    //     const response = await request(app).delete('/api/public/users/-1');
    //     expect(response.statusCode).toBe(404);
    //     expect(response.body).toEqual(dontFounUserResponse);
    // });
});