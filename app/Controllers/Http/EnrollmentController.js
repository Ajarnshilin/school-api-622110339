'use strict'

const Database = use('Database')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class EnrollmentController {
    async index () {
        const enrollments = await Database.table('enrollments')
        return { status: 200, error: undefined, data: undefined}
    }

    async show ({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined}

        const enrollments = await Database
            .select('*')
            .from('groups')
            .where("group_id", id)
            .first()

        return { status: 200, error: undefined, data: student || {} }
    }

    async store ({ request }) {
        const {mark, mark_date, student_id, subject_id} = request.body

        const rules = {
            mark:'required',
            mark_date:'required',
            student_id:'required',
            subject_id:'required'
    }

        const validation = await Validator.validateAll(request.body, rules)

        if(validation.false)
         return {status: 422, error: validation.message(), data: undefined}
    }

    async update({request}){
        const { body , params } = request
        const { id } = params
        const { mark, mark_date, student_id, subject_id } = body

        const enrollmentId = await Database
            .table('enrollments')
            .where({enrollment_id:id})
            .update({mark, mark_date, student_id, subject_id})

        const enrollment = await Database
        .table('enrollments')
        .where({enrollment_id:enrollmentId})
        .first()

        return { status: 200, error: undefined, data:{ mark, mark_date, student_id, subject_id} }
    }

    async destroy({request}){
        const { id } = request.params

    await Database
        .table('enrollments')
        .where({enrollment_id: id})
        .delete()

        return { status: 200, error: undefined, data:{message:'success'} }
    }

}

module.exports = EnrollmentController