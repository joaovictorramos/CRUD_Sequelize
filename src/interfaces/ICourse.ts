interface ICourse{
    id?: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    students?: string[]
}

export default ICourse