import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { RegisterDTO } from "../dto/register.dto";
import { LoginDTO } from "../dto/login.dto";
import dotenv from "dotenv";

const secretKey = "JNC";

dotenv.config();
export class UserService {
    static async register(data: RegisterDTO) {
        const { username, email, password, userType } = data;
        const existingUser = await UserRepository.findOne({
            where: { email }
        });
        if (existingUser) throw new Error("User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = UserRepository.create({
            username, email, password:
                hashedPassword, userType
        });
        return await UserRepository.save(newUser);
    }
    static async login(data: LoginDTO) {
        const { username, password } = data;
        const user = await UserRepository.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ username: user.username }, secretKey, {
            expiresIn: "1d"
        });
        console.log(user)
        return { token, user };
    }

    static async findUserById(userId:number){
        const user = await UserRepository.findOne({ where: { userId } });
        if (!user) {
            throw new Error("No user found!");
        }
        return user;
    }

}
