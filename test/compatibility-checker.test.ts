import { CompatibilityChecker } from '../src/checkers/compatibility-checker'
import { CompatibilityMode } from '../src/compatibility/compatibility-mode'
import { InvalidSchemaException } from '../src/exceptions/invalid-schema-exception'
import {
    schema1,
    schema2,
    schema3,
    schema4,
    schema5,
    schema6,
    schema7,
} from './fixtures/schemas'

describe('compatibility-checker', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    describe('compatibility checks', () => {
        describe('backward compatibility', () => {
            it('logs if printCompatibilityErrors is true', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check({ printCompatibilityErrors: true })
                expect(logSpy).toHaveBeenCalledTimes(1)
            })

            it('does not log is printCompatibilityErrors is false', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(logSpy).not.toHaveBeenCalled()
            })

            it('adding a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field without a default value is compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('evolving a field type to a union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('adding a new type in the union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema5)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema5])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            // it('adding a default is compatible', () => {
            //   const compatible = CompatibilityChecker
            //     .check(schema2)
            //     .against([schema3])
            //     .withCompatibility(CompatibilityMode.BACKWARD)
            //     .check();
            //   expect(compatible).toBeTruthy();
            // });
        })

        describe('backward transitive compatibility', () => {
            it('logs if printCompatibilityErrors is true', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check({ printCompatibilityErrors: true })
                expect(logSpy).toHaveBeenCalledTimes(1)
            })

            it('does not log is printCompatibilityErrors is false', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(logSpy).not.toHaveBeenCalled()
            })

            it('adding a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field without a default value is compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('evolving a field type to a union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('adding a new type in the union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema5)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema5])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.BACKWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            // it('adding a default is compatible', () => {
            //   const compatible = CompatibilityChecker
            //     .check(schema2)
            //     .against([schema3])
            //     .withCompatibility(CompatibilityMode.BACKWARD)
            //     .check();
            //   expect(compatible).toBeTruthy();
            // });

            it('iteratively adding fields with defaults is compatible', () => {
                const compatible = CompatibilityChecker.check(schema6)
                    .against([schema1, schema2])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('iteratively removing a default is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema2, schema1])
                    .withCompatibility(CompatibilityMode.BACKWARD_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })
        })

        describe('forward compatibility', () => {
            it('logs if printCompatibilityErrors is true', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check({ printCompatibilityErrors: true })
                expect(logSpy).toHaveBeenCalledTimes(1)
            })

            it('does not log is printCompatibilityErrors is false', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(logSpy).not.toHaveBeenCalled()
            })

            it('adding a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a field without a default value is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('evolving a field type to a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a new type in the union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema5)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema5])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD)
                    .check()
                expect(compatible).toBeTruthy()
            })
        })

        describe('forward transitive comptibility', () => {
            it('logs if printCompatibilityErrors is true', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check({ printCompatibilityErrors: true })
                expect(logSpy).toHaveBeenCalledTimes(1)
            })

            it('does not log is printCompatibilityErrors is false', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(logSpy).not.toHaveBeenCalled()
            })

            it('adding a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a field without a default value is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('evolving a field type to a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a new type in the union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema5)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema5])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('iteratively removing fields with defaults is compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema6, schema2])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('iteratively removing a default is not transitively compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema2, schema3])
                    .withCompatibility(CompatibilityMode.FORWARD_TRANSTIVIE)
                    .check()
                expect(compatible).toBeFalsy()
            })
        })

        describe('full compatibility', () => {
            it('logs if printCompatibilityErrors is true', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check({ printCompatibilityErrors: true })
                expect(logSpy).toHaveBeenCalledTimes(1)
            })

            it('does not log is printCompatibilityErrors is false', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(logSpy).not.toHaveBeenCalled()
            })

            it('adding a field with a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('evolving a field type to a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('adding a new type in the union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema5)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema5])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FULL)
                    .check()
                expect(compatible).toBeTruthy()
            })
        })

        describe('full transitive compatibility', () => {
            it('logs if printCompatibilityErrors is true', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check({ printCompatibilityErrors: true })
                expect(logSpy).toHaveBeenCalledTimes(1)
            })

            it('does not log is printCompatibilityErrors is false', () => {
                const logSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {})
                // Known incompatible
                CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(logSpy).not.toHaveBeenCalled()
            })

            it('adding a field with a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a field with a default value is compatibile', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a field without a default value is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('evolving a field type to a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema1])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('adding a new type in the union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema5)
                    .against([schema4])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('removing a type from a union is not compatible', () => {
                const compatible = CompatibilityChecker.check(schema4)
                    .against([schema5])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeFalsy()
            })

            it('iteratively adding fields with defaults is compatible', () => {
                const compatible = CompatibilityChecker.check(schema6)
                    .against([schema1, schema2])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('iteratively remove fields with defaults is compatible', () => {
                const compatible = CompatibilityChecker.check(schema1)
                    .against([schema6, schema2])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('iteratively adding fields with defaults is compatible', () => {
                const compatible = CompatibilityChecker.check(schema6)
                    .against([schema1, schema2])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('removing a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema3)
                    .against([schema2])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })

            it('adding a default is compatible', () => {
                const compatible = CompatibilityChecker.check(schema2)
                    .against([schema3])
                    .withCompatibility(CompatibilityMode.FULL_TRANSITIVE)
                    .check()
                expect(compatible).toBeTruthy()
            })
        })

        describe('none compatibility', () => {
            it('returns true, even for completely different schemas', () => {
                const compatible = CompatibilityChecker.check(schema6)
                    .against([schema7])
                    .withCompatibility(CompatibilityMode.NONE)
                    .check()
                expect(compatible).toBeTruthy()
            })
        })
    })

    describe('schema validation', () => {
        it('throws an invalid schema exception if the schema to check is invalid', () => {
            expect(() =>
                CompatibilityChecker.check({ invalid: 'schema' })
            ).toThrow(InvalidSchemaException)
        })

        it('throws an invalid schema exception if the schema to check against is invalid', () => {
            expect(() =>
                CompatibilityChecker.check(schema1).against([
                    { invalid: 'schema' },
                ])
            ).toThrow(InvalidSchemaException)
        })
    })
})
