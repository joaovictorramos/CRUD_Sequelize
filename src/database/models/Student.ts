import sequelize, { Model } from 'sequelize'
import { v4 as uuid4 } from 'uuid'
import db from '.'

class Student extends Model{
    declare id: string
    declare name: string
    declare registration: string
    declare createdAt: Date
    declare updatedAt: Date
}

Student.init({
    id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.UUIDV4
    },
    name: {
        allowNull: false,
        type: sequelize.STRING
    },
    registration: {
        unique: true,
        allowNull: false,
        type: sequelize.STRING
    },
    createdAt: {
        type: sequelize.DATE
    },
    updatedAt: {
        type: sequelize.DATE
    }
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'student'
})

Student.beforeCreate((student, _) => {
    student.id = uuid4()
})

Student.beforeUpdate((student, _) => {
    student.id = uuid4()
})

export default Student