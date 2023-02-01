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
exports.InMemoryUsersRepository = void 0;
const node_crypto_1 = require("node:crypto");
class InMemoryUsersRepository {
    constructor() {
        this.users = [];
    }
    create({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                id: (0, node_crypto_1.randomUUID)(),
                name,
                email,
                age: null,
                // FIXME: Hash password
                password,
                created_at: new Date(),
                updated_at: new Date(),
            };
            this.users.push(user);
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const user = this.users.find(user => user.email === email);
                if (!user) {
                    return resolve(null);
                }
                return resolve(user);
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const user = this.users.find(user => user.id === id);
                if (!user) {
                    return resolve(null);
                }
                return resolve(user);
            });
        });
    }
    checkPassword(userPassword, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                return resolve(userPassword === password);
            });
        });
    }
}
exports.InMemoryUsersRepository = InMemoryUsersRepository;
