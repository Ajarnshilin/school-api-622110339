'use strict'

const Database = use('Database')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class StudentController {
    async index () {
        const students = await Database.table('students')
        return { status: 200, error: undefined, data: undefined}
    }

    async show ({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined}

        const students = await Database
            .select('*')
            .from('students')
            .where("student_id", id)
            .first()

        return { status: 200, error: undefined, data: student || {} }
    }

    async store ({ request }) {
        const {first_name, last_name, email, password, group_id} = request.body

        const rules = {
            first_name:'required',
            last_name:'required',
            email:'required|unique:students,email',
            password:'required',
            group_id:'required'
    }

        const validation = await Validator.validateAll(request.body, rules)

        if(validation.false)
         return {status: 422, error: validation.message(), data: undefined}
    }

    async update({request}){
        const { body , params } = request
        const { id } = params
        const { first_name, last_name, email, password, group_id } = body

        const studentId = await Database
            .table('subjects')
            .where({student_id:id})
            .update({first_name, last_name, email, password, group_id})

        const student = await Database
        .table('subjects')
        .where({student_id:studentId})
        .first()

        return { status: 200, error: undefined, data:{ first_name, last_name, email, password, group_id} }
    }

    async destroy({request}){
        const { id } = request.params

    await Database
        .table('students')
        .where({student_id: id})
        .delete()

        return { status: 200, error: undefined, data:{message:'success'} }
    }

}

module.exports = StudentController