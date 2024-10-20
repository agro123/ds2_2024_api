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
    test('getPQRSDById should handle unexpected errors gracefully', async () => {
        // Simulamos un fallo inesperado en supabase
        supabase.from().single.mockRejectedValue(new Error('Unexpected error'));
    
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
        const result = await PqrsdModel.getPqrsdById(1);
    
        // Verificar que el resultado sea null
        expect(result).toBeNull();
    
        // Verificar que el error inesperado sea impreso en la consola
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching user:', expect.any(Error));
    
        consoleSpy.mockRestore(); // Restaurar la consola a su estado original
    });
    test("getAllpqrss should return all pqrss and validate the first two elements", async () => {
        const mockPqrsdList = [
            {
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
            },
            {
                id: 2,
                first_name: 'Ana',
                last_name: 'Gómez',
                type_document: 2,
                number_document: 987654321,
                response_email: false,
                status: 1,
                email: 'ana.gomez@example.com',
                type_pqrsd: 2,
                object_pqrsd: 'Queja formal',
                created_at: '2024-10-19T22:43:33.815611+00:00'
            }
        ];

        // Mock de supabase para devolver el array simulado
        supabase.from.mockReturnValue({
            select: jest.fn().mockResolvedValue({
                data: mockPqrsdList,
                error: null
            })
        });

        const result = await PqrsdModel.getAllPQRSDs();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);

        const elementsToTest = Math.min(result.length, 2);

        for (let i = 0; i < elementsToTest; i++) {
            const pqrs = result[i];

            expect(pqrs).toHaveProperty("id");
            expect(pqrs).toHaveProperty("first_name");
            expect(pqrs).toHaveProperty("last_name");
            expect(pqrs).toHaveProperty("type_document");
            expect(pqrs).toHaveProperty("number_document");
            expect(pqrs).toHaveProperty("response_email");
            expect(pqrs).toHaveProperty("status");
            expect(pqrs).toHaveProperty("email");
            expect(pqrs).toHaveProperty("type_pqrsd");
            expect(pqrs).toHaveProperty("object_pqrsd");
            expect(pqrs).toHaveProperty("created_at");

            expect(typeof pqrs.id).toBe('number');
            expect(typeof pqrs.first_name).toBe('string');
            expect(typeof pqrs.last_name).toBe('string');
            expect(typeof pqrs.type_document).toBe('number');
            expect(typeof pqrs.number_document).toBe('number');
            expect(typeof pqrs.response_email).toBe('boolean');
            expect(typeof pqrs.status).toBe('number');
            expect(typeof pqrs.email).toBe('string');
            expect(typeof pqrs.type_pqrsd).toBe('number');
            expect(typeof pqrs.object_pqrsd).toBe('string');
            expect(typeof pqrs.created_at).toBe('string');
        }
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
