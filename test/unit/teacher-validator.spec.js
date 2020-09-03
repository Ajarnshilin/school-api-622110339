'use strict'

const { test } = use('Test/Suite')('Teacher Validator')

// function sum (){
//   return 2+2
// }

// test('should return error when pass incorrect email', async ({ assert }) => {
//   assert.equal(sum(), 4)
// })

const teacherValidator = require('../../service/TeacherValidator')

test('should return error when pass incorrect data', async ({ assert }) => {
    const validateData = await teacherValidator("John","Doe","wrong email", "12345")
    assert.isArray (validateData.error)
})

test('should return more than one error if incorrect data is passed', async({assert})=>{
    const validationData = await teacherValidator({
        first_name: "John",
        last_name: "Doe",
        email: "wrong email",
        password: "12345"
    })
    assert.isArray(validationData.error.length, 1)
})

test('should return undefined when pass correct data', async({assert})=>{
    const validateData= teacherValidator(
        "John","Doe","john@gmail.com","12345")
    assert.equal(validateData.error, undefined)
})