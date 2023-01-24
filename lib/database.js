import { MongoClient } from 'mongodb'

global.mongo = null

async function connectOrUseCached() {
    if (!global.mongo) {
        let dbEndpoint = process.env?.MONGO_URL
        global.mongo = new MongoClient(dbEndpoint, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    if (!global.mongo?.isConnected) {
        // console.log('reconnecting db')
        await global.mongo.connect()
    }
    return global.mongo
}

export async function publicDatabase(req, res, next) {
    const client = await connectOrUseCached()
    let dbName = process.env?.DB_NAME
    req.db = client.db(dbName)
    return next()
}
