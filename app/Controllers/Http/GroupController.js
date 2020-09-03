'use strict'

const Database = use('Database')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class GrouptController {
    async index () {
        const group = await Database.table('groups')
        return { status: 200, error: undefined, data: undefined}
    }

    async show ({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined}

        const group = await Database
            .select('*')
            .from('groups')
            .where("group_id", id)
            .first()

        return { status: 200, error: undefined, data: group || {} }
    }

    async store ({ request }) {
        const { name } = request.body

        const rules = {
            title:'required|unique:groups,name',
            teacher_id:'required',
        }

        const validation = await Validator.validateAll(request.body, rules)

        if(validation.false)
         return {status: 422, error: validation.message(), data: undefined}
    }

    async update({request}){
        const { body , params } = request
        const { id } = params
        const { name } = body

        const groupId = await Database
            .table('groups')
            .where({group_id:id})
            .update({name})

        const groups = await Database
        .table('groups')
        .where({group_id:groupId})
        .first()

        return { status: 200, error: undefined, data:{ name } }
    }

    async destroy({request}){
        const { id } = request.params

    await Database
        .table('groups')
        .where({group_id: id})
        .delete()

        return { status: 200, error: undefined, data:{message:'success'} }
    }

}

module.exports = GroupController