import { Compatibility, CompatibilityCheckOpts } from './compatibility'
import { thisSchema } from './reader-test'

export class BackwardCompatibility extends Compatibility {
    check(opts?: CompatibilityCheckOpts): boolean {
        try {
            return thisSchema(this.schema).canRead(this.against[0])
        } catch (e: unknown) {
            if (opts?.printCompatibilityErrors) {
                console.error(e)
            }
            return false
        }
    }
}
