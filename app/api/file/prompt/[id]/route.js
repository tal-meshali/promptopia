import { connectToDatabase } from '@utils/database'
import Document from '@models/prompt'

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase()
        const document = await Document.findById(params.id).populate('creator')

        if (!document) {
            return new Response('Document not found', { status: 404 })
        } else {
            return new Response(JSON.stringify(document), {
                status: 200,
            })
        }
    } catch (error) {
        return new Response('Failed to fetch documents', {
            status: 500,
        })
    }
}

export const PATCH = async (request, { params }) => {
    const { image, passport } = await request.json()
    try {
        await connectToDatabase()
        const existingBeneficiary = await Document.findById(params.id)
        if (!existingBeneficiary) {
            return new Response('Beneficiary not found', { status: 404 })
        } else {
            existingBeneficiary.image = existingBeneficiary.image === undefined ? image : existingBeneficiary.image
            existingBeneficiary.passport = existingBeneficiary.passport === undefined ? passport : existingBeneficiary.passport
            await existingBeneficiary.save()
            return new Response(JSON.stringify(existingBeneficiary), {
                status: 200,
            })
        }
    } catch (error) {
        return new Response('Failed to edit beneficiary', {
            status: 500,
        })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase()
        await Prompt.findByIdAndRemove(params.id)
    } catch (error) {
        return new Response('Failed to delete prompt', {
            status: 500,
        })
    }
}
