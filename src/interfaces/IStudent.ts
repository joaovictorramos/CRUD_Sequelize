interface IStudent{
    id?: string
    name: string
    registration: string
    createdAt: Date
    updatedAt: Date
    courses?: string[] 
}

export default IStudent