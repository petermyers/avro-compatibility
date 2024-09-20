import { Compatibility, CompatibilityCheckOpts } from './compatibility'
import { thisSchema } from './reader-test'

export class FullTransitiveCompatibility extends Compatibility {
    check(opts?: CompatibilityCheckOpts): boolean {
        try {
            this.against.forEach(
                (against) =>
                    thisSchema(this.schema).canRead(against) &&
                    thisSchema(against).canRead(this.schema)
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
