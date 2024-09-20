/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Type } from 'avsc'

export type ValidityCheckOpts = {
    printValidityErrors: boolean
}

export class ValidityChecker {
    private schema: any
    constructor(schema: any) {
        this.schema = schema
    }

    check(opts?: ValidityCheckOpts): Type | false {
        try {
            let toValidate
            if (typeof this.schema === 'string') {
                toValidate = JSON.parse(this.schema)
            } else {
                toValidate = this.schema
            }
            return Type.forSchema(toValidate as Schema)
        } catch (e: any) {
            if (opts?.printValidityErrors) {
                console.error(e)
            }
            return false
        }
    }

    static for(schema: any) {
        return new ValidityChecker(schema)
    }
}
