import { Schema, model, models } from 'mongoose'

const DocumentSchema = new Schema({
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
    },
    passport: {
        type: String,
    },
})

const Document = models.Document || model('Document', DocumentSchema)
export default Document
