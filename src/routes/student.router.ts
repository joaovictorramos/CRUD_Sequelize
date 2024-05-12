import { Router } from "express"
import StudentController from "../controller/student.controller"

const control = new StudentController()
const studentRouter = Router()

studentRouter.post("/student/create", control.create.bind(control))
studentRouter.get("/student/searchAll", control.findAll.bind(control))
studentRouter.get("/student/search/id/:id", control.findById.bind(control))
studentRouter.get("/student/search/:registration?", control.findByRegistration.bind(control))
studentRouter.put("/student/update/:registration?", control.updateByPut.bind(control))
studentRouter.patch("/student/update/:registration?", control.updateByPatch.bind(control))
studentRouter.delete("/student/delete/:registration?", control.delete.bind(control))

export default studentRouter