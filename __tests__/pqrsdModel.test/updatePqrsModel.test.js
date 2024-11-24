import updtatePqrsdModel from "../../src/models/pqrsd/updtatePqrsdModel";
import supabase from "../../src/db";

jest.mock("../../src/db", () => ({
    __esModule: true,
    default: {
        from: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        eq: jest.fn(),
    },
})); // Mock the supabase module
jest.spyOn(console, "error").mockImplementation();
describe("updtatePqrsdModel", () => {
    beforeEach(() => {
        // Reset mocks before each test
        supabase.from().update().eq.mockResolvedValue({ error: null });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("should return an error if ID is invalid", async () => {
        const result = await updtatePqrsdModel(null, { name: "test" });

        expect(result.success).toBe(false);
        expect(result.error).toBe("ID o datos de actualización inválidos");
    });

    test("should return an error if updates are invalid", async () => {
        const result = await updtatePqrsdModel(1, null);

        expect(result.success).toBe(false);
        expect(result.error).toBe("ID o datos de actualización inválidos");
    });

    test("should return an error if updates is not an object", async () => {
        const result = await updtatePqrsdModel(1, "invalid");

        expect(result.success).toBe(false);
        expect(result.error).toBe("ID o datos de actualización inválidos");
    });

    test("should update successfully and return data on success", async () => {
        const mockData = { id: 1, name: "Updated" };
        const mockResponse = { data: mockData, error: null };
        supabase.from().update().eq.mockResolvedValue(mockResponse);

        const result = await updtatePqrsdModel(1, { name: "Updated" });

        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockData);
    });

    test("should return an error if update fails", async () => {
        const mockError = { message: "Database error" };
        const mockResponse = { data: null, error: mockError };
        supabase.from().update().eq.mockResolvedValue(mockResponse);

        const result = await updtatePqrsdModel(1, { name: "Updated" });

        expect(result.success).toBe(false);
        expect(result.error).toBe(mockError);
    });
});
