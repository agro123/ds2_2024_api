import request from 'supertest';
import express from 'express';
import PqrsdModel from '../src/models/pqrsd';
import PqrsdController from '../src/controllers/pqrsController';

const publicRoute = '/api/public';

const app = express();
app.use(express.json());
app.post(publicRoute + '/pqrsd', PqrsdController.createPqrsd);
app.get(publicRoute + '/pqrsd', PqrsdController.getPqrds); // Añadido endpoint GET

jest.mock('../src/models/pqrsd'); // Mock del modelo Pqrsd

// Controlador para PQRSD
describe("PQRSD Controller", () => {

    test('POST /api/public/pqrsd should create a new PQRSD', async () => {
        const newPqrsd = {
            first_name: 'Juan',
            last_name: 'Pérez',
            type_document: 1,
            number_document: '123456789',
            object_pqrsd: 'Solicitud de información',
            email: 'juan.perez@example.com',
            type_pqrsd: 1
        };

        const createdPqrsd = { id: 1, ...newPqrsd };
        PqrsdModel.createPqrsd.mockResolvedValue(createdPqrsd); // Mockear la creación del PQRSD

        const response = await request(app)
            .post(publicRoute + '/pqrsd')
            .send(newPqrsd);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(createdPqrsd);
    });

    // test('should return 500 if PQRSD creation fails', async () => {
    //     const newPqrsd = {
    //         first_name: 'Juan',
    //         last_name: 'Pérez',
    //         type_document: 1,
    //         number_document: '123456789',
    //         object_pqrsd: 'Solicitud de información',
    //         email: 'juan.perez@example.com',
    //         type_pqrsd: 1
    //     };

    //     const errorMessage = 'Error al crear PQRSD';
    //     PqrsdModel.createPqrsd.mockRejectedValue(new Error(errorMessage)); // Simular fallo

    //     const response = await request(app)
    //         .post(publicRoute + '/pqrsd')
    //         .send(newPqrsd);

    //     expect(response.statusCode).toBe(500);
    //     expect(response.body).toEqual({ error: errorMessage });
    // });

    // Nueva prueba para el método GET
    test('GET /api/public/pqrsd should return a list of PQRSDs', async () => {
        const mockPqrds = [
            { id: 1, first_name: 'Juan', last_name: 'Pérez', email: 'juan.perez@example.com' },
            { id: 2, first_name: 'Ana', last_name: 'López', email: 'ana.lopez@example.com' }
        ];

        // Simular la función getAllPQRSDs
        PqrsdModel.getAllPQRSDs.mockResolvedValue(mockPqrds);

        // Enviar solicitud GET para obtener la lista de PQRSDs
        const response = await request(app)
            .get(publicRoute + '/pqrsd'); // Usar el endpoint GET

        // Validar que el status sea 200 y que el body del response sea el esperado
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockPqrds);
    });

    // // Nueva prueba para manejar el error en el método GET
    // test('GET /api/public/pqrsd should return 500 if getting PQRSDs fails', async () => {
    //     const errorMessage = 'Error al obtener PQRSDs';
    //     PqrsdModel.getAllPQRSDs.mockRejectedValue(new Error(errorMessage)); // Simular fallo

    //     // Enviar solicitud GET para obtener la lista de PQRSDs
    //     const response = await request(app)
    //         .get(publicRoute + '/pqrsd'); // Usar el endpoint GET

    //     // Validar que el status sea 500 y que el body del response sea el mensaje de error
    //     expect(response.statusCode).toBe(500);
    //     expect(response.body).toEqual({ error: errorMessage });
    // });

});
