"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const _1 = __importDefault(require("."));
const Course_1 = __importDefault(require("./Course"));
const Student_1 = __importDefault(require("./Student"));
class StudentCourse extends sequelize_1.Model {
}
StudentCourse.init({
    course_id: {
        allowNull: false,
        type: sequelize_1.default.UUIDV4,
        references: {
            model: 'course',
            key: 'id'
        },
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    student_id: {
        allowNull: false,
        type: sequelize_1.default.UUIDV4,
        references: {
            model: 'student',
            key: 'id'
        },
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: true,
    sequelize: _1.default,
    tableName: 'student_course',
    underscored: true
});
Course_1.default.belongsToMany(Student_1.default, {
    foreignKey: 'courseId',
    otherKey: 'studentId',
    as: 'students',
    through: StudentCourse
});
Student_1.default.belongsToMany(Course_1.default, {
    foreignKey: 'studentId',
    otherKey: 'courseId',
    as: 'courses',
    through: StudentCourse
});
exports.default = StudentCourse;
