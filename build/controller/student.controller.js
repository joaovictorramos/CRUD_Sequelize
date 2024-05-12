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
const student_service_1 = __importDefault(require("../services/student.service"));
class StudentController {
    constructor() {
        this.service = new student_service_1.default();
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = req.body;
            try {
                const { status, message } = yield this.service.create(student);
                res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findByRegistration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const registration = (_a = req.query.registration) === null || _a === void 0 ? void 0 : _a.toString();
            try {
                const { status, message } = yield this.service.findByRegistration(registration);
                res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            console.log(id);
            try {
                const { status, message } = yield this.service.findById(id);
                res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message } = yield this.service.findAll();
                res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateByPut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const student = req.body;
            const registration = (_a = req.query.registration) === null || _a === void 0 ? void 0 : _a.toString();
            try {
                const { status, message } = yield this.service.updateByPut(student, registration);
                res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateByPatch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const student = req.body;
            const registration = (_a = req.query.registration) === null || _a === void 0 ? void 0 : _a.toString();
            try {
                const { status, message } = yield this.service.updateByPatch(student, registration);
                res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const registration = (_a = req.query.registration) === null || _a === void 0 ? void 0 : _a.toString();
            try {
                const { status, message } = yield this.service.delete(registration);
                res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = StudentController;
