// const Subject = use('App/Models/Subject')

class SubjectUtil {
    constructor(SubjectModel){
        this._Subject = SubjectModel
    }

    async getAll (references){
        const subjects = this._Subject.query()

        if(references){
            const extractedReferences = references.split(",")
            subjects.with(extractedReferences)
        }

        return subjects.fetch()
    }

    getById(references){
        const subject = this._Subject.query()

        if (references){
            const extractedReferences = references.split(",")
            subject.with(extractedReferences)
        }

        return subject.where('subject_id', subjectId).fetch()
    }
}

module.exports = SubjectUtil