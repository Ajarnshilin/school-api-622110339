'use strict'

const Database = use('Database')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class EnrollmentController {
    async index () {
        const enrollments = await Database.table('enrollments')
        return { status: 200, error: undefined, data: enrollments}
    }

    async show ({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined}

        const enrollment = await Database

            .from('enrollments')
            .where("enrollment_id", id)
            .first()

        return { status: 200, error: undefined, data: group || {} }
    }

    async store ({ request }) {
        const { mark, mark_id, student_id, subject_id } = request.body

        const missingKeys = []
        if (!first_name) missingKeys.push('first_name')
        if (!last_name) missingKeys.push('last_name')
        if (!email) missingKeys.push('email')
        if (!password) missingKeys.push('password')

        if (!password) missingKeys.push('password')
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}

        const group = await Database
            .table('enrollments')
            .insert({ mark, mark_id, student_id, subject_id })

        return { status: 200 , error: undefined, data: { mark, mark_id, student_id, subject_id }}
    }
}

module.exports = EnrollmentController