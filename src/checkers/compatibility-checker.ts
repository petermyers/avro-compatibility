/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompatibilityMode } from '../compatibility/compatibility-mode'
import { Type } from 'avsc'
import { ValidityChecker } from './validity-checker'
import { InvalidSchemaException } from '../exceptions/invalid-schema-exception'
import { BackwardCompatibility } from '../compatibility/backward-compatibility'
import {
    Compatibility,
    CompatibilityCheckOpts,
} from '../compatibility/compatibility'
import { NoneCompatibility } from '../compatibility/none-compatibility'
import { BackwardTransitiveCompatibility } from '../compatibility/backward-transitive-compatibility'
import { ForwardCompatibility } from '../compatibility/forward-compatibility'
import { ForwardTransitiveCompatibility } from '../compatibility/forward-transitive-compatibility'
import { FullCompatibility } from '../compatibility/full-compatibility'
import { FullTransitiveCompatibility } from '../compatibility/full-transitive-compatibility'

export class CompatibilityChecker {
    private schema: Type
    private previousVersions: Type[]
    private compatibilityMode: CompatibilityMode

    constructor(
        schema: Type,
        previousVersions: Type[],
        compatibilityMode: CompatibilityMode
    ) {
        this.schema = schema
        this.previousVersions = previousVersions
        this.compatibilityMode = compatibilityMode
    }

    check(opts?: CompatibilityCheckOpts) {
        return this.getCompatibility().check(opts)
    }

    private getCompatibility(): Compatibility {
        switch (this.compatibilityMode) {
            case CompatibilityMode.BACKWARD:
                return new BackwardCompatibility(
                    this.schema,
                    this.previousVersions
                )
            case CompatibilityMode.BACKWARD_TRANSITIVE:
                return new BackwardTransitiveCompatibility(
                    this.schema,
                    this.previousVersions
                )
            case CompatibilityMode.FORWARD:
                return new ForwardCompatibility(
                    this.schema,
                    this.previousVersions
                )
            case CompatibilityMode.FORWARD_TRANSTIVIE:
                return new ForwardTransitiveCompatibility(
                    this.schema,
                    this.previousVersions
                )
            case CompatibilityMode.FULL:
                return new FullCompatibility(this.schema, this.previousVersions)
            case CompatibilityMode.FULL_TRANSITIVE:
                return new FullTransitiveCompatibility(
                    this.schema,
                    this.previousVersions
                )
            default:
                return new NoneCompatibility(this.schema, this.previousVersions)
        }
    }

    static check(schema: any) {
        const validSchema = ValidityChecker.for(schema).check()
        if (!validSchema)
            throw new InvalidSchemaException(`Schema ${schema} is invalid.`)
        return {
            against(previousVersions: any[]) {
                const validPreviousSchemas = previousVersions
                    .map((pv) => ValidityChecker.for(pv).check())
                    .map((pv, idx) => {
                        if (!pv)
                            throw new InvalidSchemaException(
                                `Schema ${previousVersions[idx]} is invalid.`
                            )
                        return pv
                    })
                return {
                    withCompatibility(compatibilityMode: CompatibilityMode) {
                        return new CompatibilityChecker(
                            validSchema,
                            validPreviousSchemas,
                            compatibilityMode
                        )
                    },
                }
            },
        }
    }
}
