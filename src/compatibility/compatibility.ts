import { Type } from 'avsc'

export type CompatibilityCheckOpts = {
    printCompatibilityErrors: boolean
}

export abstract class Compatibility {
    protected schema: Type
    protected against: Type[]

    constructor(schema: Type, against: Type[]) {
        this.schema = schema
        this.against = against
    }

    abstract check(opts?: CompatibilityCheckOpts): boolean
}
