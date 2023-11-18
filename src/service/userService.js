import {validate} from "../validation/validation.js";
import {loginUserValidation, registerUserValidation} from "../validation/userValidation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../handler/errorHandler.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username is already exists");
    }

    //hashing
    try {
        user.password = await bcrypt.hash(user.password, 10);
    } catch (error) {
        throw new ResponseError(500, "Error hashing password")
    }

    //save to db
    try {
        return await prismaClient.user.create({
            data: user,
            select: {
                username: true,
                name: true
            }
        });
    } catch (error) {
        throw new ResponseError(500, "Error creating user in the database");
    }
}

const login = async (request) => {
    //userValidation
    const loginRequest = validate(loginUserValidation, request);

    // check ke db apakah ada datanya
    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });
    // kondisi jika user tidak ada
    if (!user) {
        throw new ResponseError(401, "Username or password is wrong")
    }
    // cek apakah password sesuai
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password is wrong")
    }

    //membuat token yang disimpan ke db
    const token = uuid().toString()
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

export default {
    register,
    login
}
