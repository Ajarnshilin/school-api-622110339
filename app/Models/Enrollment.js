'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Enrollment extends Model {
    static get primaryKey() {
        return 'enrollment_id'
    }
    static get createdAtColumn() {
        return null
    }
    static get updatedAtColumn() {
        return null
    }
    students() {
        return this.belongsTo('App/Models/Student')
    }
    subjects() {
        return this.belongsToMany('App/Models/Subject')
    }
}

module.exports = Enrollment