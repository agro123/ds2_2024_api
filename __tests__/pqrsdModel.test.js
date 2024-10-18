import pqrsdModel, { pqrss } from "../src/models/pqrsdModel";

describe("PQRSD Model", () => {


    test("getAllpqrss should return all pqrss and validate the first two elements", async () => {
        const result = await pqrsdModel.getAllPQRSDs();

        expect(Array.isArray(result)).toBe(true);

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
            expect(typeof pqrs.email).toBe('string' || 'NULL');
            expect(typeof pqrs.type_pqrsd).toBe('number');
            expect(typeof pqrs.object_pqrsd).toBe('string');
            expect(typeof pqrs.created_at).toBe('string');
        }
    });


});
