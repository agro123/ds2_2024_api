import supabase from "../../src/db";
import PqrsdModel from "../../src/models/pqrsd";

// Mock completo del módulo de supabase
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
describe("GET BY ID PQRSD Model", () => {

    // Limpia los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();  // Limpia todos los mocks antes de cada prueba
    });
    
    test('getPQRSDById should return a PQRSD by ID (ideal scenario)', async () => {
        
        const mockPqrsd = {
            id: 1,
            first_name: 'Juan',
            last_name: 'Pérez',
            type_document: 1,
            number_document: 123456789,
            response_email: false,
            status: 1,
            email: 'juan.perez@example.com',
            type_pqrsd: 1,
            object_pqrsd: 'Solicitud de información',
            created_at: '2024-10-19T22:43:33.815611+00:00'
        };

        // Mock de supabase para devolver el objeto simulado
        supabase.from().single.mockResolvedValue({
            data: mockPqrsd,
            error: null
        });

        const result = await PqrsdModel.getPqrsdById(1);

        expect(result).toEqual(mockPqrsd);
        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('first_name', 'Juan');
        expect(result).toHaveProperty('last_name', 'Pérez');
        expect(result).toHaveProperty('email', 'juan.perez@example.com');
    });

    test('getPQRSDById should return null if PQRSD does not exist', async () => {
        
        // Mock de supabase para devolver un error
        supabase.from().single.mockResolvedValue({
            data: null,
            error: { message: 'PQRSD not found' }
        });

        const result = await PqrsdModel.getPqrsdById(999);

        expect(result).toBeNull();
    });

    test('getPQRSDById should return null on error', async () => {
        
        // Mock de supabase para simular un fallo
        supabase.from().single.mockResolvedValue({
            data: null,
            error: { message: 'Database error' }
        });

        const result = await PqrsdModel.getPqrsdById(1);

        expect(result).toBeNull();
    });
    // test('getPQRSDById should handle unexpected errors gracefully', async () => {
        
    //     // Simulamos un fallo inesperado en supabase
    //     supabase.from().single.mockRejectedValue(new Error('Unexpected error'));
    
    //     const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    //     const result = await PqrsdModel.getPqrsdById(1);
    
    //     // Verificar que el resultado sea null
    //     expect(result).toBeNull();
    
    //     // Verificar que el error inesperado sea impreso en la consola
    //     expect(consoleSpy).toHaveBeenCalledWith('Error fetching user:', expect.any(Error));
    
    //     consoleSpy.mockRestore(); // Restaurar la consola a su estado original
    // });
});
