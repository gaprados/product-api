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
const create_user_service_1 = require("../app/services/create-user-service");
const in_memory_repository_1 = require("../domain/repositories/in-memory-repository");
describe('Create User', () => {
    let usersRepository;
    let createUserService;
    beforeEach(() => {
        usersRepository = new in_memory_repository_1.InMemoryUsersRepository();
        createUserService = new create_user_service_1.CreateUserService(usersRepository);
    });
    it('should create an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            confirmation_password: '123456'
        });
        expect(user).toHaveProperty('id');
    }));
    it('should not create two users with same email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            confirmation_password: '123456'
        });
        yield expect(createUserService.execute({
            name: 'John Doe 2',
            email: 'johndoe@example.com',
            password: '123456',
            confirmation_password: '123456'
        })).rejects.toThrow(Error);
    }));
    it('should not let user create if password is lesser than 6', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234',
            confirmation_password: '1234'
        })).rejects.toThrow(Error);
    }));
    it('should not let user create if password and confirm password does not match', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            confirmation_password: '123489'
        })).rejects.toThrow(Error);
    }));
});
