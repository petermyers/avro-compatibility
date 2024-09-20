import { Type } from 'avsc'

export const thisSchema = (schema: Type) => ({
    canRead: (thisSchema: Type) => {
        schema.createResolver(thisSchema)
        return true
    },
})
