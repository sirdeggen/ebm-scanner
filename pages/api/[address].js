import nextConnect from 'next-connect'
import { httpsClientWithHeaders, woc } from '/lib'
import { publicDatabase } from '/lib/database'

async function grabAddressHistory(address) {
    try {
        return await httpsClientWithHeaders(woc + `address/${address}/history`)
    } catch (error) {
        console.log({ error })
        return { error }
    }
}

const DELAY = 334 // 3 times per second max

// function which makes one request per item in array and return when all have resolved
async function grabBlockMetadata(req, txs) {
    try {
        const promises = txs
            .map(
                (tx, idx) =>
                    new Promise((resolve, reject) => {
                        setTimeout(async () => {
                            try {
                                const block = await httpsClientWithHeaders(woc + `block/height/${tx.height}`)
                                if (block?.tx?.[0] === tx?.tx_hash) {
                                    // save to the database
                                    const result = await req.db.collection('blocks').insertOne(block)
                                    if (result?.insertedCount === 1) console.log(`Inserted block ${block.height}`)
                                    resolve(block)
                                } else {
                                    resolve(false)
                                }
                            } catch (error) {
                                reject(error)
                            }
                        }, DELAY * idx + 1)
                    })
            )
        const responses = await Promise.all(promises)
        return responses.filter(x => !!x).map(x => ({ height: x.height, hash: x.hash, txcount: x.txcount, time: x.time }))
    } catch (error) {
        console.log({ error })
        return { error }
    }
}


// convert to csv
function convertJSONArrayToCSV(json) {
    let csv = ''
    const keys = Object.keys(json[0])
    csv += keys.join(',') + '\n'
    json.forEach(row => {
        csv += keys.map(key => row[key]).join(',') + '\n'
    })
    return csv
}

const gatherData = async (req, res) => {
    try {
        // extract constant from req.body address
        const { address } = req.query

        // grab all utxos associated with the address
        const history = await grabAddressHistory(address)

        // what data do we already have?
        let blocks = await req.db.collection('blocks').find({ sort: { height: -1 } })?.toArray() || []
        const highestHeight = blocks[0]?.height || 0
        console.log({ highestHeight })

        // filter down to utxos of interest
        const txs = history.filter(({ height }) => height > highestHeight)

        if (txs.length !== 0) {
            // grab all the blocks which contain new txs
            const newBlocks = await grabBlockMetadata(req, txs)
            blocks = [...newBlocks, ...blocks]
        }

        // return the data as a csv
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=blocks.csv')
        return res.status(200).send(convertJSONArrayToCSV(blocks))
    } catch (error) {
        console.log({ error })
        return res.status(400).json({ error })
    }
}

const handler = nextConnect()

handler.use(publicDatabase).get(gatherData)
export default handler
