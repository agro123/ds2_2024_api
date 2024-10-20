import supabase from "../src/db";
import UserModel from "../src/models/user";
import bcrypt from 'bcrypt';

jest.mock('../src/db', () => ({
    __esModule: true,
    default: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis()
    }
}));

jest.mock('bcrypt', () => ({
    __esModule: true,
    default: {
        hash: jest.fn().mockReturnThis(),
    }
}));

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
    {
        "created_at": "2024-10-14T00:51:36+00:00",
        "created_by": "dude",
        "email": "cris@correo.com",
        "id": 2,
        "last_name": "Medina",
        "name": "Cristian",
        "role": 1,
        "username": "admincris"
    },
];

const mockUsersCreate = {
    "succes": true,
    "data": [
        {
            "created_at": "2024-10-14T00:51:36+00:00",
            "created_by": "dude",
            "email": "cris@correo.com",
            "id": 2,
            "last_name": "Medina",
            "name": "Cristian",
            "role": 1,
            "username": "admincris"
        }
    ]
};

const mockUsersupdate = {
    "data": {
        "name": "Alan",
        "last_name": "Lame",
        "email": "alan@gmail.com",
        "role": 1,
        "username": "omation",
        "created_by": "Sebastian Rey",
        "password": "123456"
    }
};


describe("User Model", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Prueba para obtener todos los usuarios y validar los dos primeros
    test("getAllUsers should return all users and validate the first two elements", async () => {
        supabase.from().select.mockResolvedValue({ data: mockUsers, error: null });
        const result = await UserModel.getAllUsers();

        expect(Array.isArray(result)).toBe(true);

        const elementsToTest = Math.min(result.length, 2);

        for (let i = 0; i < elementsToTest; i++) {
            const user = result[i];
            expect(user).toHaveProperty("created_at");
            expect(user).toHaveProperty("created_by");
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("last_name");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("role");
            expect(user).toHaveProperty("username");

            expect(typeof user.created_at).toBe('string');
            expect(typeof user.created_by).toBe('string');
            expect(typeof user.id).toBe('number');
            expect(typeof user.email).toBe('string' || 'NULL');
            expect(typeof user.last_name).toBe('string');
            expect(typeof user.name).toBe('string');
            expect(typeof user.role).toBe('number');
            expect(typeof user.username).toBe('string');
        }
    });

    // Escenario Ideal: Cuando se obtiene un usuario por su ID correctamente
    /* test("getUserById should return a user by ID (ideal scenario)", async () => {
         // Utilizamos un ID que sabemos que existe
         supabase.from().single.mockResolvedValue({data: mockUsers[0], error: null});
         const result = await UserModel.getUserById(1);
 
         expect(result).toHaveProperty("id", 1);
         expect(result).toHaveProperty("created_at");
         expect(result).toHaveProperty("created_by");
         expect(result).toHaveProperty("id");
         expect(result).toHaveProperty("email");
         expect(result).toHaveProperty("last_name");
         expect(result).toHaveProperty("name");
         expect(result).toHaveProperty("role");
         expect(result).toHaveProperty("username");
 
         expect(typeof result.created_at).toBe('string');
         expect(typeof result.created_by).toBe('string');
         expect(typeof result.id).toBe('number');
         expect(typeof result.email).toBe('string' || 'NULL');
         expect(typeof result.last_name).toBe('string');
         expect(typeof result.name).toBe('string');
         expect(typeof result.role).toBe('number');
         expect(typeof result.username).toBe('string');
     });*/


    /*
    // Escenario de Error: Cuando el usuario no existe
    test("getUserById should return null if the user does not exist", async () => {
        // Utilizamos un ID que sabemos que no existe
        const result = await UserModel.getUserById(-1);

        expect(result).toBeNull();
    });

    // Escenario de Entrada Inválida: Cuando el ID proporcionado no es válido
    test("getUserById should return null if the ID provided is invalid", async () => {
        let result = await UserModel.getUserById(null);
        expect(result).toBeNull();

        result = await UserModel.getUserById(undefined);
        expect(result).toBeNull();

        result = await UserModel.getUserById("string");
        expect(result).toBeNull();
    });

    */

    // test("createUser should create a new user", async () => {
    //     const createUser = {
    //         name: "Kevin",
    //         last_name: "Aristizabal",
    //         email: "karistizabal307@gmail.com",
    //         role: 1,
    //         username: "kev405",
    //         created_by: "Sebastian Rey",
    //         password: "123456"
    //     };
    //     supabase.from().insert.mockResolvedValue({ data: [createUser], error: null });

    //     expect(typeof createUser.created_by).toBe('string');
    //     expect(typeof createUser.email).toBe('string' || 'NULL');
    //     expect(typeof createUser.last_name).toBe('string');
    //     expect(typeof createUser.name).toBe('string');
    //     expect(typeof createUser.role).toBe('number');
    //     expect(typeof createUser.username).toBe('string');
    //     expect(typeof createUser.password).toBe('string');

    //     const result = await UserModel.createUser(createUser);

    //     expect(typeof result.data).toBe('object');
    // });

    // test("createUser should handle unexpected errors", async () => {
    //     const createUser = {
    //         name: "Kevin",
    //         last_name: 18,
    //         email: "karistizabal307@gmail.com",
    //         role: 1,
    //         username: "kev405",
    //         created_by: "Sebastian Rey",
    //         password: "123456"
    //     };
    //     supabase.from().insert.mockResolvedValue({ sucess: true, data: mockUsersCreate, error: null });
    //     try {
    //         await UserModel.createUser(createUser);
    //     } catch (error) {
    //         expect(error).toBeInstanceOf(Error);
    //         expect(error.message).toBe('string');
    //     }
    // });

    test("updateUser should update an existing user", async () => {
        const updatedUser = {
            name: "Alan",
            last_name: "Lame",
            email: "alan@gmail.com",
            role: 1,
            username: "omation",
            created_by: "Sebastian Rey",
            password: "123456"
        };
        supabase.from().update.mockResolvedValue({ error: null });
        supabase.from().single.mockResolvedValue({ data: mockUsersupdate, error: null });
        bcrypt.hash.mockResolvedValue('123456');
        const result = await UserModel.updateUser(17, updatedUser);
        expect(typeof result.success).toBe('boolean');
        expect(typeof result.data).toBe('object');
    });

    test("updateUser should return null if the user does not exist", async () => {
        const updatedUser = {
            name: "Alan",
            last_name: "Lame",
            email: "alan@gmail.com",
            role: 1,
            username: "omation",
            created_by: "Sebastian Rey",
            password: "123456"
        };
        const result = await UserModel.updateUser(999, updatedUser);
        expect(typeof result.success).toBe('boolean');
        expect(typeof result.message).toBe('string');
    });

    test("updateUser should return null if the ID provided is invalid", async () => {
        const updatedUser = {
            name: "Alan",
            last_name: "Lame",
            email: "alan@gmail.com",
            role: 1,
            username: "omation",
            created_by: "Sebastian Rey",
            password: "123456"
        };

        let result = await UserModel.updateUser(null, updatedUser);
        expect(typeof result.success).toBe('boolean');
        expect(typeof result.message).toBe('string');

        result = await UserModel.updateUser(undefined, updatedUser);
        expect(typeof result.success).toBe('boolean');
        expect(typeof result.message).toBe('string');
    });

    test("updateUser should return null if no update data is provided", async () => {
        const result = await UserModel.updateUser(1, {});
        expect(typeof result.success).toBe('boolean');
        expect(typeof result.message).toBe('string');
    });

    test("updateUser should handle unexpected errors", async () => {
        const updatedUser = {
            name: "Alan",
            last_name: "Lame",
            email: "alan@gmail.com",
            role: 1,
            username: "omation",
            created_by: "Sebastian Rey",
            password: "123456"
        };

        try {
            await UserModel.updateUser(17, updatedUser);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Unexpected error");
        }
    });



    /*
    
    test("deleteUser should delete a user by ID", () => {
        const result = UserModel.deleteUser(1);
        expect(result).toHaveProperty("id", 1);
        expect(users.length).toBe(2);
    });

    test("deleteUser should return null if the user does not exist", () => {
        const result = UserModel.deleteUser(-1);
        expect(result).toBeNull();
    });
    */

});
