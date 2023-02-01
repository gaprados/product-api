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
exports.DBUsersRepositoy = void 0;
const prisma_1 = require("../../infra/lib/prisma");
class DBUsersRepositoy {
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = data;
            const user = yield this.prisma.user.create({
                data: {
                    name,
                    password,
                    email,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    age: true,
                    created_at: true,
                    updated_at: true,
                }
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    email,
                }
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    id,
                }
            });
            return user;
        });
    }
}
exports.DBUsersRepositoy = DBUsersRepositoy;
