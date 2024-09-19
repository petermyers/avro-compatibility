import { example } from '../src/index'

describe('example', () => {
    it('should add two numbers', () => {
        expect(example(1, 2)).toEqual(3)
    })
})
