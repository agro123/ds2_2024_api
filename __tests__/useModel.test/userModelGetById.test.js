import supabase from "../../src/db/index";
import getUserById from "../../src/models/user/getUserByIdModel";

// Mockear el cliente de Supabase
jest.mock("../../src/db", () => ({
    __esModule: true,
    default: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn(),
    },
}));

jest.spyOn(console, 'error').mockImplementation();

describe("getUserById User Model", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getUserById should return a user by ID (ideal scenario)", async () => {
        const mockData = {
            created_at: "2024-10-14T00:51:36+00:00",
            created_by: "dude",
            email: "cris@correo.com",
            id: 1,
            last_name: "Medina",
            name: "Cristian",
            role: 1,
            username: "admincris",
        };
        supabase.single.mockResolvedValue({ data: mockData, error: null });

        const result = await getUserById(1);
        expect(result).toEqual(mockData);
        expect(supabase.from).toHaveBeenCalledWith("users");
        expect(supabase.from().select).toHaveBeenCalledWith("*");
        expect(supabase.from().select().eq).toHaveBeenCalledWith("id", 1);
        expect(supabase.from().select().eq().single).toHaveBeenCalled();
    });

    test("getUserById should return null if the user does not exist", async () => {
        const mockError = new Error("Error fetching user");
        supabase.single.mockResolvedValue({ data: null, error: mockError });

        const result = await getUserById(1);
        expect(result).toBeNull();
        expect(supabase.from).toHaveBeenCalledWith("users");
        expect(supabase.from().select).toHaveBeenCalledWith("*");
        expect(supabase.from().select().eq).toHaveBeenCalledWith("id", 1);
        expect(supabase.from().select().eq().single).toHaveBeenCalled();
    });
});
