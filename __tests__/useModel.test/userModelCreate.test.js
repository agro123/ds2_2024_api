import bcrypt from "bcrypt";
import supabase from "../../src/db";
import createUser from "../../src/models/user/createUserModel";

// Mockear las dependencias
jest.mock("bcrypt");
jest.mock("../../src/db", () => ({
    __esModule: true,
    default: {
        from: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        select: jest.fn(),
    },
}));

const mockUser = {
    name: "Kevin",
    last_name: "Aristizabal",
    email: "karistizabal307@gmail.com",
    role: 1,
    username: "kev405",
    created_by: "Sebastian Rey",
    password: "123456",
};
const hashedPassword = "hashedPassword123";
const insertedData = { id: 1, ...mockUser, password: hashedPassword };
jest.spyOn(console, 'error').mockImplementation();
describe("createUser", () => {
    beforeEach(() => {
        bcrypt.hash.mockResolvedValue(hashedPassword);
        supabase
            .from()
            .insert()
            .select.mockResolvedValue({ data: [insertedData], error: null });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should create a user with hashed password", async () => {
        const result = await createUser(mockUser);
        expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
        expect(supabase.from).toHaveBeenCalledWith("users");
        expect(supabase.from().insert).toHaveBeenCalledWith([
            {
                name: mockUser.name,
                last_name: mockUser.last_name,
                email: mockUser.email,
                role: mockUser.role,
                username: mockUser.username,
                created_by: mockUser.created_by,
                password: hashedPassword,
            },
        ]);
        expect(supabase.from().insert().select).toHaveBeenCalled();
        expect(result).toEqual({ success: true, data: [insertedData] });
    });

    test("should handle errors when hashing password", async () => {
        const hashError = new Error("Hashing error");
        bcrypt.hash.mockRejectedValue(hashError);
        const result = await createUser(mockUser);
        expect(result).toEqual(hashError);
    });

    test("should handle errors when inserting user", async () => {
        const insertError = new Error("Insert error");
        supabase
            .from()
            .insert()
            .select.mockResolvedValue({ data: null, error: insertError });
        const result = await createUser(mockUser);
        expect(result).toEqual(insertError);
    });
});
