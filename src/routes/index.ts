import { Router } from "express"
import studentRouter from "./student.router"
import courseRouter from "./course.router"

const router = Router()
router.use(studentRouter)
router.use(courseRouter)

export default router