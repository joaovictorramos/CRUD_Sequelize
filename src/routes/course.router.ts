import { Router } from "express"
import CourseController from "../controller/course.controller"

const control = new CourseController()
const courseRouter = Router()

courseRouter.post("/course/create", control.create.bind(control))
courseRouter.get("/course/searchAll", control.findAll.bind(control))
courseRouter.get("/course/search/:name?", control.findByName.bind(control))
courseRouter.get("/course/search/id/:id", control.findById.bind(control))
courseRouter.put("/course/update/:name?", control.updateByPut.bind(control))
courseRouter.patch("/course/update/:name?", control.updateByPatch.bind(control))
courseRouter.delete("/course/delete/:name?", control.delete.bind(control))

export default courseRouter