import { ValidityChecker } from '../src/checkers/validity-checker'

describe('validity-checker', () => {
    it('should return true for valid string schemas', () => {
        const schema = `{
        "type" : "record",
        "namespace" : "Tutorialspoint",
        "name" : "Employee",
        "fields" : [
           { "name" : "Name" , "type" : "string" },
           { "name" : "Age" , "type" : "int" }
        ]
     }`

        expect(ValidityChecker.for(schema).check()).toBeTruthy()
    })

    it('should return true for valid object schemas', () => {
        const schema = `{
        "type" : "record",
        "namespace" : "Tutorialspoint",
        "name" : "Employee",
        "fields" : [
           { "name" : "Name" , "type" : "string" },
           { "name" : "Age" , "type" : "int" }
        ]
     }`
        const schemaObj = JSON.parse(schema)

        expect(ValidityChecker.for(schemaObj).check()).toBeTruthy()
    })

    it('should return false for invalid string schemas', () => {
        const schema = `{
        "name" : "Employee",
        "fields" : [
           { "name" : "Name" , "type" : "string" },
           { "name" : "Age" , "type" : "int" }
        ]
     }`

        expect(ValidityChecker.for(schema).check()).toBeFalsy()
    })

    it('should return false for invalid object schemas', () => {
        const schema = `{
        "type" : "record",
        "namespace" : "Tutorialspoint",
        "name" : "Employee",
        "fields" : [
           { "name" : "Name" , "type" : "string" },
           { "name" : "Age" , "type" : "intt" }
        ]
     }`
        const schemaObj = JSON.parse(schema)

        expect(ValidityChecker.for(schemaObj).check()).toBeFalsy()
    })

    it('should log errors if incompatible and option is on', () => {
        const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

        const schema = `{
         "type" : "record",
         "namespace" : "Tutorialspoint",
         "name" : "Employee",
         "fields" : [
            { "name" : "Name" , "type" : "string" },
            { "name" : "Age" , "type" : "intt" }
         ]
      }`
        const schemaObj = JSON.parse(schema)
        ValidityChecker.for(schemaObj).check({ printValidityErrors: true })

        expect(logSpy).toHaveBeenCalled()
    })
})
