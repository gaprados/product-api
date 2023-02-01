"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkJwt(req, res, next) {
    const token = req.headers["authorization"];
    const [, tokenValue] = (token === null || token === void 0 ? void 0 : token.split(' ')) || [];
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(tokenValue, 'MYSECRETKEY');
        req.userId = decoded.sub;
        next();
    }
    catch (err) {
        res.status(400).json({
            error: "Invalid token."
        });
    }
}
exports.checkJwt = checkJwt;
