import { connectToDatabase } from '@utils/database'
import Document from '@models/document'

export const GET = async (request) => {
    try {
        await connectToDatabase()
        const documents = await Document.find({}).populate('creator')
        return new Response(JSON.stringify(documents), {
            status: 200,
        })
    } catch (error) {
        return new Response('Failed to fetch prompts', {
            status: 500,
        })
    }
}
