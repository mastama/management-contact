import {web} from "../src/application/web.js";
import supertest from "supertest";
import {logger} from "../src/application/logging.js";
import {removeTestUser} from "./util.test.js";

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'masjih',
                password: 'rahasia456',
                name: 'Masjih Pratama'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("masjih");
        expect(result.body.data.name).toBe("Masjih Pratama");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        // Register a user with the provided credentials
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'masjih',
                password: 'rahasia456',
                name: 'Masjih Pratama'
            });

        logger.info(result.body);

        // Ensure the registration is successful (status code 200)
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("masjih");
        expect(result.body.data.name).toBe("Masjih Pratama");
        expect(result.body.data.password).toBeUndefined();

        // Attempt to register the same username again
        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'masjih',
                password: 'rahasia456',
                name: 'Masjih Pratama'
            });

        logger.info(result.body);

        // Ensure the registration is rejected (status code 400)
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

});
