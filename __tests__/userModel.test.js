import userModel, { users } from "../src/models/userModel";

// describe("User Model", () => {
//     test("getAllUsers should return all users", () => {
//         const result = userModel.getAllUsers();
//         expect(result).toEqual(users);
//     });

   test("getUserById should return a user by ID", () => {
       const result = userModel.getUserById(1);
       expect(result).toHaveProperty("id", 1);
   });

//     test("createUser should create a new user", () => {
//         const newUser = { name: "Mark Smith", email: "mark@example.com" };
//         const result = userModel.createUser(newUser);
//         expect(result).toHaveProperty("id", 3);
//         expect(result).toHaveProperty("name", "Mark Smith");
//         expect(result).toHaveProperty("email", "mark@example.com");
//     });

//     test("updateUser should update an existing user", () => {
//         const updatedUser = { name: "John Smith" };
//         const result = userModel.updateUser(1, updatedUser);
//         expect(result).toHaveProperty("name", "John Smith");
//     });

//     test("updateUser should return null if the user does not exist", () => {
//       const updatedUser = { name: "John Smith" };
//       const result = userModel.updateUser(-1, updatedUser);
//       expect(result).toBeNull();
//   });

//     test("deleteUser should delete a user by ID", () => {
//         const result = userModel.deleteUser(1);
//         expect(result).toHaveProperty("id", 1);
//         expect(users.length).toBe(2);
//     });

//     test("deleteUser should return null if the user does not exist", () => {
//         const result = userModel.deleteUser(-1);
//         expect(result).toBeNull();
//     });
// });
