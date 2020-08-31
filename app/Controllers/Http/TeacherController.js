'use strict'

const Database = use('Database')
const Hash = use('Hash')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
    return { error: 'param: ${number} is not a number, please use number type param instead.'}
        // throw new Error('Please use number as a param')
    return {}
}

class TeacherController {
    async index(){
        const teachers = await Database.table('teachers')
        return {status:200, error:undefined, data: undefined}
    }

async show ({request}){
    const{id} = request.params

    const validateValue = numberTypeParamValidator(id)

    if (validateValue.error)
        return {status: 500, error: validateValue.error, data: undefined}

    const teacher = await Database
        .select('*')
        .from('teachers')
        .where('teacher_id', id)
        .first()

    return { status: 200, error: undefined, data: teacher || {} }
    }

async store({request}){
    const {first_name, last_name, email, password} = request.body

    const missingKey = []

    if(!first_name) missingKey.push('first_name')
    if(!last_name) missingKey.push('first_name')
    if(!email) missingKey.push('email')
    if(!password) missingKey.push('password')

    if(missingKey.length)
     return {status: 422, error:`${missingKey}: is missing.`, data: undefined}

    const hashPassword = await Hash.make(password)

    const teacher = await Database
        .table('teachers')
        .insert({first_name, last_name, email, password: hashPassword})
    
        return { status: 200, error: undefined, data:{first_name, last_name, email} }
        // return teacher
    }

}
acherController

module.exports = Te