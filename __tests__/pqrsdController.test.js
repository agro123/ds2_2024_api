import request from "supertest";
import express from "express";
import PqrsdModel from "../src/models/pqrsd";
import PqrsdController from "../src/controllers/pqrsController";

const publicRoute = "/api/public";

const app = express();
app.use(express.json());

jest.mock("../src/models/pqrsd");

app.post(publicRoute + "/pqrsd", PqrsdController.createPqrsd);
app.get(publicRoute + "/pqrsd", PqrsdController.getPqrds); // Añadido endpoint GET
app.put(publicRoute + "/pqrsd/:id", PqrsdController.updatePqrsd);

jest.spyOn(console, 'error').mockImplementation();
// Controlador para PQRSD
describe("PQRSD Controller", () => {
    beforeEach(() => {
        PqrsdModel.createPqrsd.mockClear();
        PqrsdModel.getAllPQRSDs.mockClear();
        PqrsdModel.getPqrsdById.mockClear();
        PqrsdModel.updtatePqrsdModel.mockClear();
    });

    test("POST /api/public/pqrsd should create a new PQRSD", async () => {
        const newPqrsd = {
            first_name: "Juan",
            last_name: "Pérez",
            type_document: 1,
            number_document: "123456789",
            object_pqrsd: "Solicitud de información",
            email: "juan.perez@example.com",
            type_pqrsd: 1,
        };

        const createdPqrsd = { id: 1, ...newPqrsd };
        PqrsdModel.createPqrsd.mockResolvedValue(createdPqrsd); // Mockear la creación del PQRSD

        const response = await request(app)
            .post(publicRoute + "/pqrsd")
            .send(newPqrsd);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(createdPqrsd);
    });

    // Nueva prueba para el método GET
    test("GET /api/public/pqrsd should return a list of PQRSDs", async () => {
        const mockPqrds = [
            {
                id: 1,
                first_name: "Juan",
                last_name: "Pérez",
                email: "juan.perez@example.com",
            },
            {
                id: 2,
                first_name: "Ana",
                last_name: "López",
                email: "ana.lopez@example.com",
            },
        ];

        // Simular la función getAllPQRSDs
        PqrsdModel.getAllPQRSDs.mockResolvedValue(mockPqrds);

        // Enviar solicitud GET para obtener la lista de PQRSDs
        const response = await request(app).get(publicRoute + "/pqrsd"); // Usar el endpoint GET

        // Validar que el status sea 200 y que el body del response sea el esperado
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockPqrds);
    });

    test("PUT /api/public/pqrsd/:id should update an existing PQRSD", async () => {
        const id = "123";
        const updatedPqrsd = {
            first_name: "Juan",
            last_name: "Pérez",
            type_document: 1,
            number_document: "123456789",
            object_pqrsd: "Solicitud de información",
            email: "juan.perez@example.com",
            type_pqrsd: 1,
            status:  1,
            created_at: '1-2-2000'
        };
        PqrsdModel.updtatePqrsdModel.mockResolvedValue({
            success: true,
            data: updatedPqrsd,
        });
        const response = await request(app)
            .put(`${publicRoute}/pqrsd/${id}`)
            .send(updatedPqrsd);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ success: true, data: updatedPqrsd });
    });

    test("PUT /api/public/pqrsd/:id should return 400 if fields are missing", async () => {
        const partialUpdate = { first_name: "Juan" };
        const id = "123";
        PqrsdModel.updtatePqrsdModel.mockReturnValue({
            success: false,
            message: "Faltan campos",
        });
        const response = await request(app)
            .put(`${publicRoute}/pqrsd/${id}`)
            .send(partialUpdate);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain("Faltan campos");
    });

    test("PUT /api/public/pqrsd/:id should return 500 if there is a server error", async () => {
        const updatedPqrsd = {
            first_name: "Juan",
            last_name: "Pérez",
            type_document: 1,
            number_document: "123456789",
            object_pqrsd: "Solicitud de información",
            email: "juan.perez@example.com",
            type_pqrsd: 1,
            status:  1,
            created_at: '1-2-2000'
        };
        const id = "123";
        PqrsdModel.updtatePqrsdModel.mockReturnValue(
            new Error("Error interno del servidor")
        );
        const response = await request(app)
            .put(`${publicRoute}/pqrsd/${id}`)
            .send(updatedPqrsd);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            message: "No se pudo actualizar el PQRSD",
        });
    });
});
