import nextConnect from 'next-connect'

const gatherData = async (req, res) => {
    try {
        // extract constant from req.body address
        const { address } = req.body

        // make api call to whatsonchain to grab blocks which pay out to the address


        return res.json(response)
    } catch (error) {
        console.log({ error })
        return res.status(400).json({ error })
    }
}

const handler = nextConnect()

handler.post(createSignatureRequest)
export default handler
