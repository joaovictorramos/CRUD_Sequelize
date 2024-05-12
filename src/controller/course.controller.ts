import { Request, Response, NextFunction } from "express"
import CourseService from "../services/course.service"

class CourseController{
    private service = new CourseService()

    async create(req: Request, res: Response, next: NextFunction){
        const course = req.body
        try {
            const { status, message } = await this.service.create(course)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async findByName(req: Request, res: Response, next: NextFunction){
        const name = req.query.name?.toString()
        try {
            const { status, message } = await this.service.findByName(name)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction){
        const id = req.params.id
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
        const course = req.body
        const name = req.query.name?.toString()
        try {
            const { status, message } = await this.service.updateByPut(course, name)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async updateByPatch(req: Request, res: Response, next: NextFunction){
        const course = req.body
        const name = req.query.name?.toString()
        try {
            const { status, message } = await this.service.updateByPatch(course, name)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const name = req.query.name?.toString()
        try {
            const { status, message } = await this.service.delete(name)
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}

export default CourseController