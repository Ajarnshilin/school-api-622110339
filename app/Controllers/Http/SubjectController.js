'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Subject = use('App/Models/Subject')

function numberTypeParamValidator(number){
    if(Number .isNaN(parseInt(number)))
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

class SubjectController {
    async index (request) {
        const { references = undefined} = request.qs
        const extractedReferences = references.split(",")

        const subjects = Subject.query()
    
        if (references && extractedReferences.length)
            subjects.with(extractedReferences)

        return { status: 200, error: undefined, data: await subjects.fetch()}
    }

    async show ({ request }) {
        const { id } = request.body
        const subject = await Subject.find(id)

        return { status: 200, error: undefined, data: subject || {} }
    }

    async store ({ request }) {
        const { title, teacher_id } = request.body
        // const subject = new Subject();
        // subject.title = title;
        // subject.teacher_id = teacher_id;
        const subject = new Subject()
            subject.title = title
            subject.teacher_id = teacher_id
            await subject.save()

        return { status: 200, error: undefined, data:{message:'success'} }

        const rules = {
            title:'required|unique:teachers,title',
            teacher_id:'required'
        }

        const validation = await Validator.validateAll(request.body, rules)

        if(validation.false)
         return {status: 422, error: validation.message(), data: undefined}
    }

    async update({request}){
        const { body , params } = request
        const { id } = params
        const { title, teacher_id } = body

        const subjectId = await Database
            .table('subjects')
            .where({subject_id:id})
            .update({title, teacher_id})

        const subject = await Database
        .table('subjects')
        .where({subject_id:subjectId})
        .first()

        return { status: 200, error: undefined, data:{ title, teacher_id} }
    }

    async destroy({request}){
        const { id } = request.params

    await Database
        .table('subjects')
        .where({subject_id: id})
        .delete()

        return { status: 200, error: undefined, data:{message:'success'} }
    }

    async showTeacher({request}){
        const {id} = request.params
        const subject = await Database
        .table('subjects')
        .where({subject_id:id})
        .innerJoin('teachers','subject_id','teachers.teacher_id')
        .first()

        return {status:200, error: undefined, data: subject || {}}
    }

}

module.exports = SubjectController