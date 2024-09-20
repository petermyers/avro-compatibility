import { Compatibility } from './compatibility'

export class NoneCompatibility extends Compatibility {
    check(): boolean {
        return true
    }
}
