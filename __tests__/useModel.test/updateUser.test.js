import bcrypt from "bcrypt";
import supabase from "../../src/db";
import updateUser from "../../src/models/user/updateUserModel";
jest.mock("bcrypt");
jest.mock("../../src/db", () => ({
    __esModule: true,
    default: {
        from: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        eq: jest.fn(),
    },
}));

jest.spyOn(console, "error").mockImplementation;

const hashedPassword = "hashedPassword123";
const mockUserId = 1;
const mockUserData = {
    name: "Alan",
    last_name: "Lame",
    email: "alan@gmail.com",
    role: 1,
    username: "omation",
    created_by: "Sebastian Rey",
    password: "hashedPassword123"
};

describe("UserModel updateUser", () => {
    beforeEach(() => {
        bcrypt.hash.mockResolvedValue(hashedPassword);
        supabase.from().update().eq.mockResolvedValue({ error: null });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    test("should update user with hashed password", async () => {
        const result = await updateUser(mockUserId, mockUserData);
        expect(supabase.from).toHaveBeenCalledWith("users");
        expect(supabase.from().update).toHaveBeenCalledWith(mockUserData);
        expect(supabase.from().update().eq).toHaveBeenCalledWith(
            "id",
            mockUserId
        );
        expect(result).toEqual({ success: true, data: mockUserData });
    });

    test("should handle empty user data", async () => {
        const result = await updateUser(mockUserId, {});
        expect(result).toEqual({
            success: false,
            message: "User data is invalid or user does not exist.",
        });
    });

    test("should handle errors during password hashing", async () => {
        const hashError = new Error("Hashing error");
        bcrypt.hash.mockRejectedValue(hashError);
        const result = await updateUser(mockUserId, mockUserData);
        expect(result).toEqual({
            success: false,
            message: "Error al procesar la solicitud.",
        });
    });

    test("should handle errors during database update", async () => {
        const updateError = new Error("Update error");
        supabase.from().update().eq.mockResolvedValue({ error: updateError });
        const result = await updateUser(mockUserId, mockUserData);
        expect(result).toEqual({ success: false, error: "Update error" });
    });
});
