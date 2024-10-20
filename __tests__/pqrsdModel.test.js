import supabase from "../src/db";
import PqrsdModel from "../src/models/pqrsd";

// Mock completo del módulo de supabase
jest.mock('../src/db', () => ({
    from: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn(),
        insert: jest.fn(() => ({
            select: jest.fn()
        }))
    }))
}));

describe("PQRSD Model", () => {

    // Limpia los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();  // Limpia todos los mocks antes de cada prueba
    });
    // Test para crear una nueva PQRSD con mock
    test("createPqrsd should create a new PQRSD and return it with the correct properties", async () => {
        const newPqrsd = {
            first_name: 'Juan',
            last_name: 'Pérez',
            type_document: 1,
            number_document: 123456789,
            object_pqrsd: 'Solicitud de información',
            email: 'juan.perez@example.com',
            type_pqrsd: 1
        };

        const mockCreatedPqrsd = [
            {
                id: 1,
                ...newPqrsd,
                response_email: false,  
                status: 1,              
                created_at: '2024-10-19T22:43:33.815611+00:00'
            }
        ];

        // Mock de supabase para devolver el objeto simulado
        supabase.from.mockReturnValue({
            insert: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    data: mockCreatedPqrsd,
                    error: null
                })
            })
        });

        const result = await PqrsdModel.createPqrsd(newPqrsd);

        expect(result).toEqual(mockCreatedPqrsd);
    });

    test('should return an error when createPqrsd fails', async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Pérez',
            type_document: 1,
            number_document: 123456789,
            object_pqrsd: 'Solicitud de información',
            email: 'juan.perez@example.com',
            type_pqrsd: 1
        };

        // Mock de supabase para devolver un error simulado
        supabase.from.mockReturnValue({
            insert: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    data: null,
                    error: 'Error de supabase'
                })
            })
        });

        const result = await PqrsdModel.createPqrsd(mockUser);
        expect(result).toEqual('Error de supabase');
    });

    test('should return an unexpected error when something fails', async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Pérez',
            type_document: 1,
            number_document: 123456789,
            object_pqrsd: 'Solicitud de información',
            email: 'juan.perez@example.com',
            type_pqrsd: 1
        };

        // Simulamos un fallo inesperado
        supabase.from.mockImplementation(() => ({
            insert: () => ({
                select: () => Promise.reject(new Error('Unexpected error'))
            })
        }));

        try {
            await PqrsdModel.createPqrsd(mockUser);
        } catch (error) {
            expect(error.message).toEqual('Unexpected error');
        }
    });
});
