'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')
const Group = use('App/Models/Group')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) {
        return { error: `param: ${number}`}
    }
    return{}
}

class GroupController {
    async index({request}) {
        const {references = ""} = request.qs
        const groups = Group
            .query()
        if(references) {
            const extractedReferences = references.split(",")
            groups.with(extractedReferences)
        }
        return { status: 200, error: undefined, data: await groups.fetch()}
    }
    async show({request}) {
        const { id } = request.params

        const validateValue = numberTypeParamValidator(id)

        if(validateValue.error) 
            return { status: 500, error: validateValue.error , data: undefined}

        const group = await Group
            .query()
            .where('group_id',id)
            .first()
        return { status: 200, error: undefined, date: group || {}}

    }
    async store({request}) {
        const {name} = request.body

        const rules = {
            name:'required'
        }
        
        const validation = await Validator.validateAll(request.body,rules)

        if(validation.fails())
            return {stats: 422, error: validation.messages(), date: undefined}


        return {status: 422, error: `${missingKeys}` , data: undefined}

        const group = await Group
            .query()
            .insert({name})
            return { status: 200, error: undefined, date: {name}}
    }
    async update({request}) {
        const {body , params} = request
        const {id} = params
        const {name} = body

        const groupID = await Group
            .query()
            .where('group_id',id)
            .update({name})
        const group = await Group
            .query()
            .where('group_id',id)
            .first()
        return {status:200 , error: undefined , date: group ||{}}
    }
    async destroy({request}) {
        const { id } = request.params
        const deleteGroup = await Group
            .query()
            .where('group_id',id)
            .delete()

        return {status: 200 , error:undefined , date: {message:'success'}}
    }
}

module.exports = GroupController