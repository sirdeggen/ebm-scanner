import nextConnect from 'next-connect'
import { headers, httpsClientWithHeaders, woc } from '/lib'
import { publicDatabase } from '/lib/database'

async function grabAddressHistory(address) {
    try {
        return await httpsClientWithHeaders(woc + `address/${address}/history`, headers)
    } catch (error) {
        console.log({ error })
        return { error }
    }
}

async function grabBlockMetadata(bh) {
    try {
        return await httpsClientWithHeaders(woc + `block/hash/${bh}`, headers)
    } catch (error) {
        console.log({ error })
        return { error }
    }
}

const DELAY = 334 // 3 times per second max

const gatherData = async (req, res) => {
    try {
        // extract constant from req.body address
        const { address } = req.query

        // grab all utxos associated with the address
        const history = await grabAddressHistory(address)

        // grab all the blocks which contain the utxos
        const blocks = await grabBlockMetadata(bh)

        // make api call to whatsonchain to grab blocks which pay out to the address

        return res.json(response)
    } catch (error) {
        console.log({ error })
        return res.status(400).json({ error })
    }
}

const handler = nextConnect()

handler.use(publicDatabase).get(gatherData)
export default handler
