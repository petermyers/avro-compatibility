import { Compatibility, CompatibilityCheckOpts } from './compatibility'
import { thisSchema } from './reader-test'

export class ForwardCompatibility extends Compatibility {
    check(opts?: CompatibilityCheckOpts): boolean {
        try {
            return thisSchema(this.against[0]).canRead(this.schema)
        } catch (e: unknown) {
            if (opts?.printCompatibilityErrors) {
                console.error(e)
            }
            return false
        }
    }
}