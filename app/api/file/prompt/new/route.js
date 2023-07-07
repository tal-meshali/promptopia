import { connectToDatabase } from '@utils/database'
import Document from '@models/document'

export const POST = async (req, res) => {
    const { image, passport, userId } = await req.json()
    try {
        await connectToDatabase()
        const newUpload = new Document({
            creator: userId,
            image: image,
            passport: passport
        })
        await newUpload.save()

        return new Response(JSON.stringify(newUpload), {
            status: 201,
        })
    } catch (error) {
        return new Response('Failed to upload document', {
            status: 500,
        })
    }
}
