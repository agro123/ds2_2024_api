import userModel, { users } from "../src/models/userModel";

describe("User Model", () => {

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


    // test("getUserById should return a user by ID", async () => {
    //     const result = await userModel.getUserById(1);
    //     console.log(result);
    //     expect(result).toHaveProperty("id", 1);
    // });

    // test("createUser should create a new user", () => {
    //     const newUser = { name: "Mark Smith", email: "mark@example.com" };
    //     const result = userModel.createUser(newUser);
    //     expect(result).toHaveProperty("id", 3);
    //     expect(result).toHaveProperty("name", "Mark Smith");
    //     expect(result).toHaveProperty("email", "mark@example.com");
    // });

    // test("updateUser should update an existing user", () => {
    //     const updatedUser = { name: "John Smith" };
    //     const result = userModel.updateUser(1, updatedUser);
    //     expect(result).toHaveProperty("name", "John Smith");
    // });

    // test("updateUser should return null if the user does not exist", () => {
    //     const updatedUser = { name: "John Smith" };
    //     const result = userModel.updateUser(-1, updatedUser);
    //     expect(result).toBeNull();
    // });

    // test("deleteUser should delete a user by ID", () => {
    //     const result = userModel.deleteUser(1);
    //     expect(result).toHaveProperty("id", 1);
    //     expect(users.length).toBe(2);
    // });

    // test("deleteUser should return null if the user does not exist", () => {
    //     const result = userModel.deleteUser(-1);
    //     expect(result).toBeNull();
    // });

});
