"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_1 = require("@cube/common");
const signIn_1 = __importDefault(require("@application/useCases/signIn"));
const createIndividual_1 = __importDefault(require("@application/useCases/createIndividual"));
const getCurrentIndividual_1 = __importDefault(require("@application/useCases/getCurrentIndividual"));
const createIndividualMiddleware_1 = __importDefault(require("../middlewares/createIndividualMiddleware"));
const signInIndividualMiddleware_1 = __importDefault(require("../middlewares/signInIndividualMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const individualRouter = (0, express_1.Router)();
individualRouter.post('/', createIndividualMiddleware_1.default, (0, common_1.expressRouteAdapter)(createIndividual_1.default));
individualRouter.post('/login', signInIndividualMiddleware_1.default, (0, common_1.expressRouteAdapter)(signIn_1.default));
individualRouter.get('/me', authMiddleware_1.default, (0, common_1.expressRouteAdapter)(getCurrentIndividual_1.default));
exports.default = individualRouter;
