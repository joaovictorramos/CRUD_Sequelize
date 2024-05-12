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
const Course_1 = __importDefault(require("../database/models/Course"));
const resp_1 = __importDefault(require("../utils/resp"));
const StudentCourse_1 = __importDefault(require("../database/models/StudentCourse"));
const Student_1 = __importDefault(require("../database/models/Student"));
StudentCourse_1.default.associations;
class CourseService {
    constructor() {
        this.model = Course_1.default;
    }
    create(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (course) {
                    let listStudents;
                    const students = yield Promise.all(course.students.map((e) => __awaiter(this, void 0, void 0, function* () {
                        return yield Student_1.default.findByPk(e);
                    })));
                    if (students.some(e => e)) {
                        listStudents = students;
                    }
                    else {
                        return (0, resp_1.default)(404, "Not found student");
                    }
                    const courseOut = yield this.model.create(Object.assign(Object.assign({}, course), { listStudents }));
                    const studentCourse = course.students.map((e) => ({
                        course_id: courseOut.id,
                        student_id: e
                    }));
                    yield StudentCourse_1.default.bulkCreate(studentCourse);
                    return yield (0, resp_1.default)(201, courseOut);
                }
                return yield (0, resp_1.default)(400, "Unable to register course");
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield this.model.findAll();
            if (!courses) {
                return yield (0, resp_1.default)(404, "Not found courses");
            }
            return yield (0, resp_1.default)(200, courses);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseOut = yield this.model.findOne({
                where: {
                    name: name
                },
                include: [{ model: Student_1.default, as: 'students' }]
            });
            if (!courseOut) {
                return yield (0, resp_1.default)(404, "Not found course");
            }
            return yield (0, resp_1.default)(200, courseOut);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseOut = yield this.model.findOne({
                where: {
                    id: id
                }
            });
            if (!courseOut) {
                return yield (0, resp_1.default)(404, "Not found course");
            }
            return yield (0, resp_1.default)(200, courseOut);
        });
    }
    updateByPut(course, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message } = yield this.findByName(name);
                if (!message) {
                    return yield (0, resp_1.default)(404, "Not found course with this name");
                }
                const courseOut = message;
                courseOut.update(course);
                return yield (0, resp_1.default)(200, "Course updated");
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateByPatch(course, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message } = yield this.findByName(name);
                if (!message) {
                    return yield (0, resp_1.default)(404, "Not found course with this name");
                }
                const courseOut = message;
                courseOut.update(course);
                return yield (0, resp_1.default)(200, "Course updated");
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message } = yield this.findByName(name);
                if (!message) {
                    return yield (0, resp_1.default)(404, "Not found course with this name");
                }
                const courseOut = message;
                const courseId = courseOut.id;
                StudentCourse_1.default.destroy({ where: {
                        course_id: courseId
                    } });
                courseOut.destroy();
                return yield (0, resp_1.default)(200, "Course deleted");
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CourseService;
