export const httpsClientWithHeaders = async (url, headers, b = false) => {
    try {
        const body = b ? JSON.stringify(body) : undefined
        const method = b ? 'POST' : 'GET'
        return await (
            await fetch(url, {
                method,
                headers,
                body,
            })
        ).json()
    } catch (error) {
        console.log({ error })
        return { error }
    }
}

export const woc = 'https://api.whatsonchain.com/v1/bsv/main/'
export const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // 'Authorization': `Basic ${process.env.WOC_API_KEY}` we never used one
}