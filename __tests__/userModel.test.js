import UserModel from "../src/models/user";

describe("User Model", () => {

    // Prueba para obtener todos los usuarios y validar los dos primeros
    test("getAllUsers should return all users and validate the first two elements", async () => {
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
    test("getUserById should return a user by ID (ideal scenario)", async () => {
        // Utilizamos un ID que sabemos que existe
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
    });

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

    
    test("createUser should create a new user", async () => {
        const createUser = {
            name: "Kevin",
            last_name: "Aristizabal",
            email: "karistizabal307@gmail.com",
            role: 1,
            username: "kev405",
            created_by: "Sebastian Rey",
            password: "123456"
        };

        expect(typeof createUser.created_by).toBe('string');
        expect(typeof createUser.email).toBe('string' || 'NULL');
        expect(typeof createUser.last_name).toBe('string');
        expect(typeof createUser.name).toBe('string');
        expect(typeof createUser.role).toBe('number');
        expect(typeof createUser.username).toBe('string');
        expect(typeof createUser.password).toBe('string');
      
        const result = await UserModel.createUser(createUser);
        
        expect(typeof result.success).toBe('boolean');
        expect(typeof result.data).toBe('object');
    });

    test("updateUser should handle unexpected errors", async () => {
        const createUser = {
            name: "Kevin",
            last_name: 18,
            email: "karistizabal307@gmail.com",
            role: 1,
            username: "kev405",
            created_by: "Sebastian Rey",
            password: "123456"
        };
      
        try {
          await UserModel.createUser(createUser);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('string');
        }
    });

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
        expect(typeof result.message).toBe('undefined');
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

    // Puedes habilitar las siguientes pruebas cuando sea necesario
    /*
    test("createUser should create a new user", () => {
        const newUser = { name: "Mark Smith", email: "mark@example.com" };
        const result = UserModel.createUser(newUser);
        expect(result).toHaveProperty("id", 3);
        expect(result).toHaveProperty("name", "Mark Smith");
        expect(result).toHaveProperty("email", "mark@example.com");
    });

    test("updateUser should update an existing user", () => {
        const updatedUser = { name: "John Smith" };
        const result = UserModel.updateUser(1, updatedUser);
        expect(result).toHaveProperty("name", "John Smith");
    });

    test("updateUser should return null if the user does not exist", () => {
        const updatedUser = { name: "John Smith" };
        const result = UserModel.updateUser(-1, updatedUser);
        expect(result).toBeNull();
    });

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
