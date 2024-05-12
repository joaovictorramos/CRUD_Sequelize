"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = __importDefault(require("../controller/student.controller"));
const control = new student_controller_1.default();
const studentRouter = (0, express_1.Router)();
studentRouter.post("/student/create", control.create.bind(control));
studentRouter.get("/student/searchAll", control.findAll.bind(control));
studentRouter.get("/student/search/id/:id", control.findById.bind(control));
studentRouter.get("/student/search/:registration?", control.findByRegistration.bind(control));
studentRouter.put("/student/update/:registration?", control.updateByPut.bind(control));
studentRouter.patch("/student/update/:registration?", control.updateByPatch.bind(control));
studentRouter.delete("/student/delete/:registration?", control.delete.bind(control));
exports.default = studentRouter;
