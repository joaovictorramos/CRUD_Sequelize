import sequelize, { Model } from 'sequelize'
import { v4 as uuid4 } from 'uuid'
import db from '.'

class Course extends Model{
    declare id: string
    declare name: string
    declare description: string
    declare createdAt: Date
    declare updatedAt: Date
}

Course.init({
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
    description: {
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
    tableName: 'course'
})

Course.beforeCreate((course, _) => {
    course.id = uuid4()
})

Course.beforeUpdate((course, _) => {
    course.id = uuid4()
})

export default Course