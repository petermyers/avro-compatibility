import { Type } from 'avsc'

export const schema1 = Type.forSchema({
    type: 'record',
    name: 'myrecord',
    fields: [{ type: 'string', name: 'f1' }],
})

export const schema2 = Type.forSchema({
    type: 'record',
    name: 'myrecord',
    fields: [
        { type: 'string', name: 'f1' },
        { type: 'string', name: 'f2', default: 'foo' },
    ],
})

export const schema3 = Type.forSchema({
    type: 'record',
    name: 'myrecord',
    fields: [
        { type: 'string', name: 'f1' },
        { type: 'string', name: 'f2' },
    ],
})

export const schema4 = Type.forSchema({
    type: 'record',
    name: 'myrecord',
    fields: [
        {
            type: ['null', 'string'],
            name: 'f1',
            doc: 'doc of f1',
        },
    ],
})

export const schema5 = Type.forSchema({
    type: 'record',
    name: 'myrecord',
    fields: [
        {
            type: ['null', 'string', 'int'],
            name: 'f1',
            doc: 'doc of f1',
        },
    ],
})

export const schema6 = Type.forSchema({
    type: 'record',
    name: 'myrecord',
    fields: [
        { type: 'string', name: 'f1' },
        { type: 'string', name: 'f2', default: 'foo' },
        { type: 'string', name: 'f3', default: 'bar' },
    ],
})

export const schema7 = Type.forSchema({
    type: 'record',
    name: 'thing',
    fields: [{ type: 'boolean', name: 'boolattr' }],
})
