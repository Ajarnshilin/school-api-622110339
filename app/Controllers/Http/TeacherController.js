'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Teacher = use('App/Models/Teacher')


function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
    return { error: 'param: ${number} is not a number, please use number type param instead.'}
        // throw new Error('Please use number as a param')
    return {}
}

class TeacherController {

    async index({request}){
        const {references = ""} = request.qs
        const teachers = Teacher
            .query()
        if(references) {
            const extractedReferences = references.split(",")
            teachers.with(extractedReferences)
        }
        return {status:200, error:undefined, data: undefined}
    }

async show ({request}){
    const{id} = request.params

    const validateValue = numberTypeParamValidator(id)

    if (validateValue.error)
        return {status: 500, error: validateValue.error, data: undefined}

    const teacher = await Teacher
        .query()
        .from('teachers')
        .where('teacher_id', id)
        .first()

    return { status: 200, error: undefined, data: teacher || {} }
    }

async store({request}){
    const {first_name, last_name, email, password} = request.body

    const rules = {
        first_name:'required',
        last_name:'required',
        email:'required|unique:teachers,email',
        password:'required|max:12'
    }

    const validation = await Validator.validateAll(request.body, rules)

    if(validation.false)
     return {status: 422, error: validation.message(), data: undefined}

    const teacher = await Teacher
        .query()
        .insert({first_name, last_name, email, password})
    
        return { status: 200, error: undefined, data:{first_name, last_name, email, password} }
    }

    async update({request}){
        const { body , params } = request
        const { id } = params
        const { first_name, last_name, email } = body

        const teacherId = await Teacher
            .query()
            .where({teacher_id:id})
            .update({first_name, last_name, email})

        const teacher = await Teacher
        .query()
        .where({teacher_id:teacherId})
        .first()

        return { status: 200, error: undefined, data:{first_name, last_name, email} }
    }

    async destroy({request}){
        const { id } = request.params

    await Teacher
        .query()
        .where({teacher_id: id})
        .delete()

        return { status: 200, error: undefined, data:{message:'success'} }
    }

}


module.exports = TeacherController