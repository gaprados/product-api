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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const checkJwt_1 = require("../../app/middlewares/checkJwt");
const create_session_service_1 = require("../../app/services/create-session-service");
const create_user_service_1 = require("../../app/services/create-user-service");
const get_user_by_id_service_1 = require("../../app/services/get-user-by-id-service");
const mysql_users_repository_1 = require("../../domain/repositories/mysql-users-repository");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// const inMemoryUsersRepositoy = new InMemoryUsersRepository();
const usersRepository = new mysql_users_repository_1.DBUsersRepositoy();
const createUserService = new create_user_service_1.CreateUserService(usersRepository);
const createSessionService = new create_session_service_1.CreateSessionService(usersRepository);
const GetUserByIdService = new get_user_by_id_service_1.GetUserById(usersRepository);
app.get('/test', (req, res) => {
    return res.json({ message: "Hello, Im working!" });
});
app.post('/sessions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield createSessionService.execute({ email, password });
        return res.json(user);
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(400).json({ error: err.message });
    }
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmation_password } = req.body;
        const user = yield createUserService.execute({ name, email, password, confirmation_password });
        return res.json(user);
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(400).json({ error: err.message });
    }
}));
app.get('/me', checkJwt_1.checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield GetUserByIdService.execute(req.userId);
    return res.json(user);
}));
app.listen(3333, () => console.log('Server is running'));
