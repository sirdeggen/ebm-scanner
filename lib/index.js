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
