'use strict'

const Database = use('Database')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class SubjectController {
    async index () {
        const subjects = await Database.table('subjects')
        return { status: 200, error: undefined, data: subjects}
    }

    async show ({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined}

        const subject = await Database

            .from('subjects')
            .where("subject_id", id)
            .first()

        return { status: 200, error: undefined, data: group || {} }
    }

    async store ({ request }) {
        const { title, teacher_id } = request.body

        const missingKeys = []
        if (!first_name) missingKeys.push('first_name')
        if (!last_name) missingKeys.push('last_name')
        if (!email) missingKeys.push('email')
        if (!password) missingKeys.push('password')

        if (!password) missingKeys.push('password')
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}

        const group = await Database
            .table('subjects')
            .insert({ title, teacher_id })

        return { status: 200 , error: undefined, data: { title, teacher_id }}
    }
}

module.exports = SubjectController