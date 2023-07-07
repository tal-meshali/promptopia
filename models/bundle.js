import { Schema, model, models } from 'mongoose'
import Document from './document'

const BundleSchema = new Schema({
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    beneficiaries: {
        type: List,
        of: Document
    }
})

const Bundle = models.Bundle || model('Bundle', BundleSchema)
export default Bundle
