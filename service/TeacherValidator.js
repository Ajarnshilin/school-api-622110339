module.exports = teacherValidator
const Validator = use('Validator')

async function teacherValidator ({first_name, last_name, email, password}) {
    
    
    const rules = {
        first_name:'required',
        last_name:'required',
        email:'required|unique:teachers,email',
        password:'required'
    }

    const validation = await Validator.validateAll({
        first_name, last_name, email, password
    }, rules)

    return {
        error: validation.message()
    }
}