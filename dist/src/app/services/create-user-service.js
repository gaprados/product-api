"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcrypt_1 = require("bcrypt");
class CreateUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ name, email, password, confirmation_password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.usersRepository.findByEmail(email);
            const isPasswordValid = password.length >= 6;
            const isPasswordConfirmed = password === confirmation_password;
            if (!isPasswordValid) {
                throw new Error('Password must be at least 6 characters');
            }
            if (!isPasswordConfirmed) {
                throw new Error('Password confirmation does not match');
            }
            if (userAlreadyExists) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
            const user = yield this.usersRepository.create({
                name,
                email,
                password: hashedPassword,
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
            };
        });
    }
}
exports.CreateUserService = CreateUserService;
