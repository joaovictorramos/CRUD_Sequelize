import { ModelStatic, Optional } from 'sequelize'
import Student from '../database/models/Student'
import resp from '../utils/resp'
import Course from '../database/models/Course'
import StudentCourse from '../database/models/StudentCourse'
import IStudent from '../interfaces/IStudent'

/*
   STUDENT finalizado. Fazer o mesmo create e findByName em Course
*/


StudentCourse.associations

class StudentService{
    private model: ModelStatic<Student> = Student

    async create(student: IStudent | undefined){
        try {
            if(student){
                let listCourses
                const courses = await Promise.all(student.courses!.map( async(e) => {
                    return await Course.findByPk(e)
                }))
                if(courses.some(e => e)){
                    listCourses = courses
                }else{
                    return resp(404, "Not found course")
                }

                const studentOut = await this.model.create({ 
                    ...student,
                    listCourses
                 })

                const studentCourse = student.courses!.map((e)=>({
                    student_id: studentOut.id,
                    course_id: e
                }))
                await StudentCourse.bulkCreate(studentCourse)
                return await resp(201, studentOut)
            }
            return await resp(400, "Unable to register student")
        } catch (error) {
            throw error
        }
    }

    async findAll(){
        const students = await this.model.findAll()
        if(!students){
            return await resp(404, "Not found students")
        }
        return await resp(200, students)
    }

    async findByRegistration(registration: string | undefined){
        const studentOut = await this.model.findOne({
            where: {
                registration: registration
            },
            include: [{ model: Course, as: 'courses' }]
        })
        if(!studentOut){
            return await resp(404, "Not found student")
        }
        return await resp(200, studentOut)
    }

    async findById(id: string | undefined){
        const studentOut = await this.model.findOne({
            where: {
                id: id
            }
        })
        if(!studentOut){
            return await resp(404, "Not found student")
        }
        return await resp(200, studentOut)
    }

    async updateByPut(student: any | undefined, registration: string | undefined){
        try {
            const { status, message } = await this.findByRegistration(registration)
            if(!message){
                return await resp(404, "Not found student with this registeer")
            }
            const studentOut = message as Student
            studentOut.update(student)
            return await resp(200, "Student updated")
        } catch (error) {
            throw error
        }
    }

    async updateByPatch(student: any | undefined, registration: string | undefined){
        try {
            const { status, message } = await this.findByRegistration(registration)
            if(!message){
                return await resp(404, "Not found student with this registeer")
            }
            const studentOut = message as Student
            studentOut.update(student)
            return await resp(200, "Student updated")
        } catch (error) {
            throw error
        }
    }

    async delete(registration: string | undefined){
        try {
            const { status, message } = await this.findByRegistration(registration)
            if(!message){
                return await resp(404, "Not found student with this register")
            }
            const studentOut = message as Student
            const studentId  = studentOut.id

            StudentCourse.destroy({ where: {
                student_id: studentId
            }})
            studentOut.destroy()
            
            return await resp(200, "Student deleted")
        } catch (error) {
            throw error
        }
    }    
}

export default StudentService