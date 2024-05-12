import { Request, Response, NextFunction } from "express"
import StudentService from "../services/student.service"

class StudentController{
    private service = new StudentService()

    async create(req: Request, res: Response, next: NextFunction){
        const student = req.body
        try {
            const { status, message } = await this.service.create(student)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async findByRegistration(req: Request, res: Response, next: NextFunction){
        const registration = req.query.registration?.toString()
        try {
            const { status, message } = await this.service.findByRegistration(registration)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction){
        const id = req.params.id
        console.log(id)
        try {
            const { status, message } = await this.service.findById(id)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction){
        try {
            const { status, message } = await this.service.findAll()
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async updateByPut(req: Request, res: Response, next: NextFunction){
        const student = req.body
        const registration = req.query.registration?.toString()
        try {
            const { status, message } = await this.service.updateByPut(student, registration)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async updateByPatch(req: Request, res: Response, next: NextFunction){
        const student = req.body
        const registration = req.query.registration?.toString()
        try {
            const { status, message } = await this.service.updateByPatch(student, registration)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const registration = req.query.registration?.toString()
        try {
            const { status, message } = await this.service.delete(registration)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}

export default StudentController