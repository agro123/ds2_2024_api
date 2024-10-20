import request from 'supertest';
import express from 'express';
import PqrsdModel from '../src/models/pqrsd';
import PqrsdController from '../src/controllers/pqrsController';

const publicRoute = '/api/public';

const app = express();
app.use(express.json());
app.post(publicRoute + '/pqrsd/', PqrsdController.createPqrsd);

jest.mock('../src/models/pqrsd'); // Mock del modelo Pqrsd
jest.mock('../src/db'); // Mock de la conexión a la base de datos

// Controlador para crear PQRSD
describe("PQRSD Controller", () => {
    
    test('POST /api/public/pqrsd should create a new PQRSD', async () => {
        // Definir el nuevo PQRSD que queremos crear
        const newPqrsd = {
            first_name: 'Juan',
            last_name: 'Pérez',
            type_document: 1,
            number_document: '123456789',
            object_pqrsd: 'Solicitud de información',
            email: 'juan.perez@example.com',
            type_pqrsd: 1
        };
    
        // Simular la respuesta de la creación de PQRSD
        const createdPqrsd = { id: 1, ...newPqrsd };
        PqrsdModel.createPqrsd.mockResolvedValue(createdPqrsd); // Mockear la creación del PQRSD
    
        // Enviar la solicitud POST para crear la PQRSD
        const response = await request(app)
            .post('/api/public/pqrsd') // Asegúrate de que el endpoint sea correcto
            .send(newPqrsd);
    
        // Validar que el status sea 201 y que el body del response sea el esperado
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(createdPqrsd);
    });

});
