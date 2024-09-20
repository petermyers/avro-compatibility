export class CompatibilityMode {
    /**
     * New schema can read previous schema.
     *
     * Changes allows:
     *  - Remove fields
     *  - Add optional fields
     * Check against which schemas
     *  - Previous version
     * Upgrade first:
     *  - Consumers
     */
    static BACKWARD: number = 1

    /**
     * New schema can read all previous schemas.
     *
     * Changes allows:
     *  - Remove fields
     *  - Add optional fields
     * Check against which schemas
     *  - All previous versions
     * Upgrade first:
     *  - Consumers
     */
    static BACKWARD_TRANSITIVE: number = 2

    /**
     * Previous schema can read new schema.
     *
     * Changes allows:
     *  - Add fields
     *  - Remove optional fields
     * Check against which schemas
     *  - Previous version
     * Upgrade first:
     *  - Producers
     */
    static FORWARD: number = 3

    /**
     * All previous schemas can read new schema.
     *
     * Changes allows:
     *  - Add fields
     *  - Remove optional fields
     * Check against which schemas
     *  - All previous versions
     * Upgrade first:
     *  - Producers
     */
    static FORWARD_TRANSTIVIE: number = 4

    /**
     * Previous schema can read new schema.
     * New schema can read previous schema.
     *
     * Changes allows:
     *  - Add optional fields
     *  - Remove optional fields
     * Check against which schemas
     *  - Previous version
     * Upgrade first:
     *  - Consumers or producers
     */
    static FULL: number = 5

    /**
     * All previous schemas can read new schema.
     * New schema can read all previous schemas.
     *
     * Changes allows:
     *  - Add optional fields
     *  - Remove optional fields
     * Check against which schemas
     *  - All previous versions
     * Upgrade first:
     *  - Consumers or producers
     */
    static FULL_TRANSITIVE: number = 6

    /**
     * Wild wild west.
     *
     * Changes allows:
     *  - Any
     * Check against which schemas
     *  - None
     * Upgrade first:
     *  - Good luck
     */
    static NONE: number = 7
}
