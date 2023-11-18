import {validate} from "../validation/validation.js";
import {registerUserValidation} from "../validation/userValidation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../handler/errorHandler.js";
import bcrypt from "bcrypt";

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
    user.password = bcrypt.hash(await user.password, 10);

    //save to db
    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });
}

export default {register}