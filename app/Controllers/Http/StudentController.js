'use strict'

const Database = use('Database')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

const Hash = use('Hash')

class StudentController {
    async index () {
        const students = await Database.table('students')
        return { status: 200, error: undefined, data: students}
    }

    async show ({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined}

        const group = await Database

            .from('students')
            .where("student_id", id)
            .first()

        return { status: 200, error: undefined, data: group || {} }
    }

    async store ({ request }) {
        const { first_name, last_name, password, email, group_id} = request.body

        const missingKeys = []
        if (!first_name) missingKeys.push('first_name')
        if (!last_name) missingKeys.push('last_name')
        if (!email) missingKeys.push('email')
        if (!password) missingKeys.push('password')

        if (!password) missingKeys.push('password')
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}

        const hashedPassword = await Hash.make(password)
        const group = await Database
            .table('students')
            .insert({ first_name, last_name, password: hashedPassword, email, group_id})

        return { status: 200 , error: undefined, data: { first_name, last_name, password, email, group_id }}
    }
}

module.exports = StudentController