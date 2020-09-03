'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Validator = use('Validator')
const Enrollment = use('App/Models/Enrollment')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class EnrollmentController {
    async index ({request}) {
        const {references = ""} = request.qs
        const enrollments = Enrollment
            .query()
        if(references) {
            const extractedReferences = references.split(",")
            enrollments.with(extractedReferences)
        }
        return { status: 200, error: undefined, data: undefined}
    }

    async show ({ request }) {
        const { id } = request.params

        const validateValue = numberTypeParamValidator(id)

        if(validateValue.error) 
            return { status: 500, error: validateValue.error , data: undefined}

        const enrollment = await Enrollment
            .query()
            .where('enrollment_id',id)
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

         const enrollment = await Enrollment
            .query()
            .insert({mark , mark_date , student_id , subject_id})
            return { status: 200, error: undefined, date: {mark,mark_date,student_id,subject_id}}
    }

    async update({request}){
        const {body , params} = request
        const {id} = params
        const {mark , mark_date , student_id , subject_id} = body

        const enrollmentID = await Enrollment
            .query()
            .where('enrollment_id',id)
            .update({mark , mark_date , student_id , subject_id})
        const enrollment = await Enrollment
            .query()
            .where('enrollment_id',enrollmentID)
            .first()

        return { status: 200, error: undefined, data:{ mark, mark_date, student_id, subject_id} }
    }

    async destroy({request}){
        const { id } = request.params
        const deleteEnrollments = await Enrollment
            .query()
            .where('enrollment_id',id)
            .delete()

        return { status: 200, error: undefined, data:{message:'success'} }
    }

}

module.exports = EnrollmentController