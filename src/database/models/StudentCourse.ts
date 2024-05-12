import sequelize, { Model } from 'sequelize'
import db from '.'
import Course from './Course'
import Student from './Student'

class StudentCourse extends Model{
    declare course_id: string
    declare student_id: string
}

StudentCourse.init({
    course_id: {
        allowNull: false,
        type: sequelize.UUIDV4,
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
        type: sequelize.UUIDV4,
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
    sequelize: db,
    tableName: 'student_course',
    underscored: true
})

Course.belongsToMany(Student, {
    foreignKey: 'courseId',
    otherKey: 'studentId',
    as: 'students',
    through: StudentCourse
})

Student.belongsToMany(Course, {
    foreignKey: 'studentId',
    otherKey: 'courseId',
    as: 'courses',
    through: StudentCourse
})

export default StudentCourse