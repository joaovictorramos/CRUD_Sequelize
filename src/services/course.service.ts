import { ModelStatic, Optional } from 'sequelize'
import Course from '../database/models/Course'
import resp from '../utils/resp'
import StudentCourse from '../database/models/StudentCourse'
import Student from '../database/models/Student'
import ICourse from '../interfaces/ICourse'

StudentCourse.associations

class CourseService{
    private model: ModelStatic<Course> = Course

    async create(course: ICourse | undefined){
        try {
            if(course){
                let listStudents
                const students = await Promise.all(course.students!.map( async(e) => {
                    return await Student.findByPk(e)
                }))
                if(students.some(e => e)){
                    listStudents = students
                }else{
                    return resp(404, "Not found student")
                }

                const courseOut = await this.model.create({
                    ...course,
                    listStudents
                })

                const studentCourse = course.students!.map((e)=>({
                    course_id: courseOut.id,
                    student_id: e
                }))
                await StudentCourse.bulkCreate(studentCourse)
                return await resp(201, courseOut)
            }
            return await resp(400, "Unable to register course")
        } catch (error) {
            throw error
        }   
    }

    async findAll(){
        const courses = await this.model.findAll()
        if(!courses){
            return await resp(404, "Not found courses")
        }
        return await resp(200, courses)
    }

    async findByName(name: string | undefined){
        const courseOut = await this.model.findOne({
            where: {
                name: name
            },
            include: [{ model: Student, as: 'students' }]
        })
        if(!courseOut){
            return await resp(404, "Not found course")
        }
        return await resp(200, courseOut)
    }

    async findById(id: string | undefined){
        const courseOut = await this.model.findOne({
            where: {
                id: id
            }
        })
        if(!courseOut){
            return await resp(404, "Not found course")
        }
        return await resp(200, courseOut)
    }

    async updateByPut(course: any | undefined, name: string | undefined){
        try {
            const { status, message } = await this.findByName(name)
            if(!message){
                return await resp(404, "Not found course with this name")
            }
            const courseOut = message as Course
            courseOut.update(course)
            return await resp(200, "Course updated")
        } catch (error) {
            throw error
        }
    }

    async updateByPatch(course: any | undefined, name: string | undefined){
        try {
            const { status, message } = await this.findByName(name)
            if(!message){
                return await resp(404, "Not found course with this name")
            }
            const courseOut = message as Course
            courseOut.update(course)
            return await resp(200, "Course updated")
        } catch (error) {
            throw error
        }
    }

    async delete(name: string | undefined){
        try {
            const { status, message } = await this.findByName(name)
            if(!message){
                return await resp(404, "Not found course with this name")
            }
            const courseOut = message as Course
            const courseId  = courseOut.id

            StudentCourse.destroy({ where: { 
                course_id: courseId
             }})
            courseOut.destroy()

            return await resp(200, "Course deleted")
        } catch (error) {
            throw error
        }
    }
}

export default CourseService