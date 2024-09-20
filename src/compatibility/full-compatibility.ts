import { Compatibility, CompatibilityCheckOpts } from './compatibility'
import { thisSchema } from './reader-test'

export class FullCompatibility extends Compatibility {
    check(opts?: CompatibilityCheckOpts): boolean {
        try {
            return (
                thisSchema(this.schema).canRead(this.against[0]) &&
                thisSchema(this.against[0]).canRead(this.schema)
            )
        } catch (e: unknown) {
            if (opts?.printCompatibilityErrors) {
                console.error(e)
            }
            return false
        }
    }
}
