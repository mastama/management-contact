import {web} from "../src/application/web.js";
import supertest from "supertest";
import {logger} from "../src/application/logging.js";
import {createTestUser, removeTestUser} from "./util.test.js";

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia456',
                name: 'testing bos'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("testing bos");
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
                username: 'test',
                password: 'rahasia456',
                name: 'testing bos'
            });

        logger.info(result.body);

        // Ensure the registration is successful (status code 200)
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("testing bos");
        expect(result.body.data.password).toBeUndefined();

        // Attempt to register the same username again
        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia456',
                name: 'testing bos'
            });

        logger.info(result.body);

        // Ensure the registration is rejected (status code 400)
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can login user', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia456"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test")
    });

    it('should reject login if request is invalid ', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "",
                password: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "salahh",
                password: "rahasia456"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "salah456"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
})

describe("POST /api/users/current", function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("testing bos");
    });

    it('should reject get current user if token is invalid', async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "salah");

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
})
