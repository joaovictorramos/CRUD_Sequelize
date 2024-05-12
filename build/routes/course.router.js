"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controller/course.controller"));
const control = new course_controller_1.default();
const courseRouter = (0, express_1.Router)();
courseRouter.post("/course/create", control.create.bind(control));
courseRouter.get("/course/searchAll", control.findAll.bind(control));
courseRouter.get("/course/search/:name?", control.findByName.bind(control));
courseRouter.get("/course/search/id/:id", control.findById.bind(control));
courseRouter.put("/course/update/:name?", control.updateByPut.bind(control));
courseRouter.patch("/course/update/:name?", control.updateByPatch.bind(control));
courseRouter.delete("/course/delete/:name?", control.delete.bind(control));
exports.default = courseRouter;
