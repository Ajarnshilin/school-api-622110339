'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')
const Student = use('App/Models/Student')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) {
        return { error: `param: ${number}`}
    }
    return{}
}

class StudentController {
    async index({request}) {
        const {references = ""} = request.qs
        const students = Student
            .query()
        if(references) {
            const extractedReferences = references.split(",")
            students.with(extractedReferences)
        }
        return { status: 200, error: undefined, data: await students.fetch()}
    }
    async show({request}) {
        const { id } = request.params

        const validateValue = numberTypeParamValidator(id)

        if(validateValue.error) 
            return { status: 500, error: validateValue.error , data: undefined}

        const student = Student
            .query()
            .where('student_id',id)
            .first()
            
        return { status: 200, error: undefined, date: await student.fetch() || {}}

    }
    async store({request}) {
        const { first_name , last_name , email , password , group_id} = request.body

        const rules = {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email|unique:teachers,email',
            password: 'required|max:13',
            group_id: 'required'
        }
        
        const validation = await Validator.validateAll(request.body,rules)

        if(validation.fails())
            return {stats: 422, error: validation.messages(), date: undefined}

        const hashedPassword = await Hash.make(password)

        const student = await Student
            .query()
            .insert({first_name , last_name , email , password : hashedPassword,group_id})
        return { status: 200, error: undefined, date: {first_name,last_name,email,password,group_id}}
    }
    async update({request}) {
        const {body , params} = request
        const {id} = params
        const {first_name , last_name , email , password , group_id} = body

        const studentID = await Student
            .query()
            .where('student_id',id)
            .update({first_name,last_name,email,password,group_id})
        const student = await Student
            .query()
            .where('student_id',id)
            .first()
        return {status:200 , error: undefined , date: student || {}}
    }
    async destroy({request}) {
        const { id } = request.params
        const deleteStudent = await Student
            .query()
            .where('student_id',id)
            .delete()

        return {status: 200 , error:undefined , date: {message:'success'}}
    }
}

module.exports = StudentController