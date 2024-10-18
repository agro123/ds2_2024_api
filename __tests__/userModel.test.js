import userModel, { users } from "../src/models/userModel";

describe("User Model", () => {

    // Prueba para obtener todos los usuarios y validar los dos primeros
    test("getAllUsers should return all users and validate the first two elements", async () => {
        const result = await userModel.getAllUsers();

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
        const result = await userModel.getUserById(1);
        
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
        const result = await userModel.getUserById(-1);

        expect(result).toBeNull();
    });

    // Escenario de Entrada Inválida: Cuando el ID proporcionado no es válido
    test("getUserById should return null if the ID provided is invalid", async () => {
        let result = await userModel.getUserById(null);
        expect(result).toBeNull();

        result = await userModel.getUserById(undefined);
        expect(result).toBeNull();

        result = await userModel.getUserById("string");
        expect(result).toBeNull();
    });

    // Puedes habilitar las siguientes pruebas cuando sea necesario
    /*
    test("createUser should create a new user", () => {
        const newUser = { name: "Mark Smith", email: "mark@example.com" };
        const result = userModel.createUser(newUser);
        expect(result).toHaveProperty("id", 3);
        expect(result).toHaveProperty("name", "Mark Smith");
        expect(result).toHaveProperty("email", "mark@example.com");
    });

    test("updateUser should update an existing user", () => {
        const updatedUser = { name: "John Smith" };
        const result = userModel.updateUser(1, updatedUser);
        expect(result).toHaveProperty("name", "John Smith");
    });

    test("updateUser should return null if the user does not exist", () => {
        const updatedUser = { name: "John Smith" };
        const result = userModel.updateUser(-1, updatedUser);
        expect(result).toBeNull();
    });

    test("deleteUser should delete a user by ID", () => {
        const result = userModel.deleteUser(1);
        expect(result).toHaveProperty("id", 1);
        expect(users.length).toBe(2);
    });

    test("deleteUser should return null if the user does not exist", () => {
        const result = userModel.deleteUser(-1);
        expect(result).toBeNull();
    });
    */

});
