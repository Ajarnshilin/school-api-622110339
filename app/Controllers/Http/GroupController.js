'use strict'

const Database = use('Database')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class GroupController {
    async index () {
        const groups = await Database.table('groups')
        return { status: 200, error: undefined, data: groups}
    }

    async show ({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined}

        const group = await Database

            .from('groups')
            .where("group_id", id)
            .first()

        return { status: 200, error: undefined, data: group || {} }
    }

    async store ({ request }) {
        const { name } = request.body

        const missingKeys = []
        if (!first_name) missingKeys.push('first_name')
        if (!last_name) missingKeys.push('last_name')
        if (!email) missingKeys.push('email')
        if (!password) missingKeys.push('password')

        if (!password) missingKeys.push('password')
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}

        const group = await Database
            .table('groups')
            .insert({ name })

        return { status: 200 , error: undefined, data: { name }}
    }
}

module.exports = GroupController