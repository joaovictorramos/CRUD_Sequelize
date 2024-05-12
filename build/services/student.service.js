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
const Student_1 = __importDefault(require("../database/models/Student"));
const resp_1 = __importDefault(require("../utils/resp"));
const Course_1 = __importDefault(require("../database/models/Course"));
const StudentCourse_1 = __importDefault(require("../database/models/StudentCourse"));
/*
   STUDENT finalizado. Fazer o mesmo create e findByName em Course
*/
StudentCourse_1.default.associations;
class StudentService {
    constructor() {
        this.model = Student_1.default;
    }
    create(student) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (student) {
                    let listCourses;
                    const courses = yield Promise.all(student.courses.map((e) => __awaiter(this, void 0, void 0, function* () {
                        return yield Course_1.default.findByPk(e);
                    })));
                    if (courses.some(e => e)) {
                        listCourses = courses;
                    }
                    else {
                        return (0, resp_1.default)(404, "Not found course");
                    }
                    const studentOut = yield this.model.create(Object.assign(Object.assign({}, student), { listCourses }));
                    const studentCourse = student.courses.map((e) => ({
                        student_id: studentOut.id,
                        course_id: e
                    }));
                    yield StudentCourse_1.default.bulkCreate(studentCourse);
                    return yield (0, resp_1.default)(201, studentOut);
                }
                return yield (0, resp_1.default)(400, "Unable to register student");
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield this.model.findAll();
            if (!students) {
                return yield (0, resp_1.default)(404, "Not found students");
            }
            return yield (0, resp_1.default)(200, students);
        });
    }
    findByRegistration(registration) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentOut = yield this.model.findOne({
                where: {
                    registration: registration
                },
                include: [{ model: Course_1.default, as: 'courses' }]
            });
            if (!studentOut) {
                return yield (0, resp_1.default)(404, "Not found student");
            }
            return yield (0, resp_1.default)(200, studentOut);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentOut = yield this.model.findOne({
                where: {
                    id: id
                }
            });
            if (!studentOut) {
                return yield (0, resp_1.default)(404, "Not found student");
            }
            return yield (0, resp_1.default)(200, studentOut);
        });
    }
    updateByPut(student, registration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message } = yield this.findByRegistration(registration);
                if (!message) {
                    return yield (0, resp_1.default)(404, "Not found student with this registeer");
                }
                const studentOut = message;
                studentOut.update(student);
                return yield (0, resp_1.default)(200, "Student updated");
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateByPatch(student, registration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message } = yield this.findByRegistration(registration);
                if (!message) {
                    return yield (0, resp_1.default)(404, "Not found student with this registeer");
                }
                const studentOut = message;
                studentOut.update(student);
                return yield (0, resp_1.default)(200, "Student updated");
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(registration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message } = yield this.findByRegistration(registration);
                if (!message) {
                    return yield (0, resp_1.default)(404, "Not found student with this register");
                }
                const studentOut = message;
                const studentId = studentOut.id;
                StudentCourse_1.default.destroy({ where: {
                        student_id: studentId
                    } });
                studentOut.destroy();
                return yield (0, resp_1.default)(200, "Student deleted");
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = StudentService;
