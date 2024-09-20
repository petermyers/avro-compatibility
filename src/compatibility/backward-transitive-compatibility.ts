import { Compatibility, CompatibilityCheckOpts } from './compatibility'
import { thisSchema } from './reader-test'

export class BackwardTransitiveCompatibility extends Compatibility {
    check(opts?: CompatibilityCheckOpts): boolean {
        try {
            this.against.forEach((against) =>
                thisSchema(this.schema).canRead(against)
            )
            return true
        } catch (e: unknown) {
            if (opts?.printCompatibilityErrors) {
                console.error(e)
            }
            return false
        }
    }
}
